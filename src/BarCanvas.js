/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { generateGroupedBars, generateStackedBars } from './compute'
import { renderAxesToCanvas, computeAxisTicks } from '@nivo/core'
import { getRelativeCursor, isCursorInRect } from '@nivo/core'
import { Container } from '@nivo/core'
import { BasicTooltip } from '@nivo/core'
import { BarPropTypes } from './props'
import BarSlices from './BarSlices';
import enhance from './enhance'

const findNodeUnderCursor = (nodes, margin, x, y) =>
    nodes.find(node =>
        isCursorInRect(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y)
    )

class BarCanvas extends Component {
    state = {
        ticks: []
    }
    componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    shouldComponentUpdate(props) {
        if (
            this.props.outerWidth !== props.outerWidth ||
            this.props.outerHeight !== props.outerHeight ||
            this.props.isInteractive !== props.isInteractive ||
            this.props.theme !== props.theme
        ) {
            return true
        } else {
            this.draw(props)
            return false
        }
    }

    componentDidUpdate() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    draw(props) {
        const {
            // data
            data,
            keys,
            getIndex,
            minValue,
            maxValue,
            keyNames,
            templates,
            enableTemplates,

            // dimensions
            width,
            height,
            outerWidth,
            outerHeight,
            pixelRatio,
            margin,

            // layout
            layout,
            reverse,
            groupMode,
            padding,
            innerPadding,

            // axes
            axisTop,
            axisRight,
            axisBottom,
            axisLeft,

            // theming
            getColor,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        const options = {
            layout,
            reverse,
            data,
            getIndex,
            keys,
            minValue,
            maxValue,
            width,
            height,
            getColor,
            padding,
            innerPadding,
            keyNames,
            templates,
        }

        const result =
            groupMode === 'grouped' ? generateGroupedBars(options) : generateStackedBars(options)

        this.bars = result.bars

        this.ctx.clearRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        renderAxesToCanvas(this.ctx, {
            xScale: result.xScale,
            yScale: result.yScale,
            width,
            height,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft,
        })
          const { y, ticks } = computeAxisTicks({
            width: this.props.width,
            height: this.props.height,
            scale: result.xScale,
            position: 'bottom',
          })

        result.bars.forEach(({ x, y, color, width, height }) => {
            this.ctx.fillStyle = color
            this.ctx.fillRect(x, y, width, height)
        })
    }

    handleMouseHover = (showTooltip, hideTooltip) => event => {
        if (!this.bars) return

        const { margin, theme } = this.props
        const [x, y] = getRelativeCursor(this.surface, event)

        const bar = findNodeUnderCursor(this.bars, margin, x, y)

        if (bar !== undefined) {
            showTooltip(
                <BasicTooltip
                    id={`${bar.data.id} - ${bar.data.indexValue}`}
                    value={bar.data.value}
                    enableChip={true}
                    color={bar.color}
                    theme={theme}
                />,
                event
            )
        } else {
            hideTooltip()
        }
    }

    handleMouseLeave = hideTooltip => () => {
        hideTooltip()
    }

    handleClick = event => {
        if (!this.bars) return

        const { margin, onClick } = this.props
        const [x, y] = getRelativeCursor(this.surface, event)

        const node = findNodeUnderCursor(this.bars, margin, x, y)
        if (node !== undefined) onClick(node.data, event)
    }

    renderTicks(templates, showTooltip, hideTooltip) {
      const {
        // data
        data,
        keys,
        getIndex,
        minValue,
        maxValue,
        keyNames,
        width,
        height,
        layout,
        reverse,
        groupMode,
        padding,
        innerPadding,

        getColor,
      } = this.props;
      const options = {
        layout,
        reverse,
        data,
        getIndex,
        keys,
        minValue,
        maxValue,
        width,
        height,
        getColor,
        padding,
        innerPadding,
        keyNames,
        templates
      };

      const result =
        groupMode === 'grouped' ? generateGroupedBars(options) : generateStackedBars(options)
      const { y, ticks } = computeAxisTicks({
        width: this.props.width,
        height: this.props.height,
        scale: result.xScale,
        position: 'bottom',
      })
      const ticksTemplate = (ticks || []).map(({x}, index) => {
        return (
          <div
            className="bar-chart__axis"
            key={x}
            style={{
              transform: `translateX(${x + this.props.margin.left}px)`,
              top: `${y + 15}px`
            }}
          >
              <div className="bar-chart__axis-item">
                  <div dangerouslySetInnerHTML={{__html: templates[index]}} />
              </div>
          </div>
        ) ;
      });
      return (
        <div style={{
          position: 'absolute',
          height: `${height}px`,
          top: 0,
          left: 0,
          width: '100%',
          paddingLeft: `${this.props.margin.left}px`
        }}>
          {ticksTemplate}
          {
            layout === 'vertical'
              ?
              <BarSlices
                theme={this.props.theme}
                slices={result.slices}
                margin={this.props.margin}
                showTooltip={showTooltip}
                hideTooltip={hideTooltip}
                width={result.slices[0].width}
                height={height}
                tooltipFormat={this.props.tooltipFormat}
              />
              : ''
          }
        </div>
      )
    }

    render() {
        const { outerWidth, outerHeight, pixelRatio, isInteractive, theme, enableTemplates, templates } = this.props
        return (
              <div>
                  <Container isInteractive={isInteractive} theme={theme}>
                    {({ showTooltip, hideTooltip }) => (
                      <div style={{position: 'relative'}}>
                          <canvas
                            ref={surface => {
                              this.surface = surface
                            }}
                            width={outerWidth * pixelRatio}
                            height={outerHeight * pixelRatio}
                            style={{
                              width: outerWidth,
                              height: outerHeight,
                            }}
                            onMouseEnter={this.handleMouseHover(showTooltip, hideTooltip)}
                            onMouseMove={this.handleMouseHover(showTooltip, hideTooltip)}
                            onMouseLeave={this.handleMouseLeave(hideTooltip)}
                            onClick={this.handleClick}
                          />
                        {enableTemplates ? this.renderTicks(templates, showTooltip, hideTooltip) : ''}
                      </div>
                  )}
                  </Container>
              </div>
        )
    }
}

BarCanvas.propTypes = BarPropTypes

export default enhance(BarCanvas)
