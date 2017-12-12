function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react';
import { generateGroupedBars, generateStackedBars } from './compute';
import { renderAxesToCanvas, computeAxisTicks } from '@nivo/core';
import { getRelativeCursor, isCursorInRect } from '@nivo/core';
import { Container } from '@nivo/core';
import { BasicTooltip } from '@nivo/core';
import { BarPropTypes } from './props';
import BarSlices from './BarSlices';
import enhance from './enhance';

var findNodeUnderCursor = function findNodeUnderCursor(nodes, margin, x, y) {
    return nodes.find(function (node) {
        return isCursorInRect(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y);
    });
};

var BarCanvas = function (_Component) {
    _inherits(BarCanvas, _Component);

    function BarCanvas() {
        var _temp, _this, _ret;

        _classCallCheck(this, BarCanvas);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            ticks: []
        }, _this.handleMouseHover = function (showTooltip, hideTooltip) {
            return function (event) {
                if (!_this.bars) return;

                var _this$props = _this.props,
                    margin = _this$props.margin,
                    theme = _this$props.theme;

                var _getRelativeCursor = getRelativeCursor(_this.surface, event),
                    x = _getRelativeCursor[0],
                    y = _getRelativeCursor[1];

                var bar = findNodeUnderCursor(_this.bars, margin, x, y);

                if (bar !== undefined) {
                    showTooltip(React.createElement(BasicTooltip, {
                        id: bar.data.id + ' - ' + bar.data.indexValue,
                        value: bar.data.value,
                        enableChip: true,
                        color: bar.color,
                        theme: theme
                    }), event);
                } else {
                    hideTooltip();
                }
            };
        }, _this.handleMouseLeave = function (hideTooltip) {
            return function () {
                hideTooltip();
            };
        }, _this.handleClick = function (event) {
            if (!_this.bars) return;

            var _this$props2 = _this.props,
                margin = _this$props2.margin,
                onClick = _this$props2.onClick;

            var _getRelativeCursor2 = getRelativeCursor(_this.surface, event),
                x = _getRelativeCursor2[0],
                y = _getRelativeCursor2[1];

            var node = findNodeUnderCursor(_this.bars, margin, x, y);
            if (node !== undefined) onClick(node.data, event);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    BarCanvas.prototype.componentDidMount = function componentDidMount() {
        this.ctx = this.surface.getContext('2d');
        this.draw(this.props);
    };

    BarCanvas.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
        if (this.props.outerWidth !== props.outerWidth || this.props.outerHeight !== props.outerHeight || this.props.isInteractive !== props.isInteractive || this.props.theme !== props.theme) {
            return true;
        } else {
            this.draw(props);
            return false;
        }
    };

    BarCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
        this.ctx = this.surface.getContext('2d');
        this.draw(this.props);
    };

    BarCanvas.prototype.draw = function draw(props) {
        var _this2 = this;

        var data = props.data,
            keys = props.keys,
            getIndex = props.getIndex,
            minValue = props.minValue,
            maxValue = props.maxValue,
            keyNames = props.keyNames,
            templates = props.templates,
            enableTemplates = props.enableTemplates,
            width = props.width,
            height = props.height,
            outerWidth = props.outerWidth,
            outerHeight = props.outerHeight,
            pixelRatio = props.pixelRatio,
            margin = props.margin,
            layout = props.layout,
            reverse = props.reverse,
            groupMode = props.groupMode,
            padding = props.padding,
            innerPadding = props.innerPadding,
            axisTop = props.axisTop,
            axisRight = props.axisRight,
            axisBottom = props.axisBottom,
            axisLeft = props.axisLeft,
            getColor = props.getColor;


        this.surface.width = outerWidth * pixelRatio;
        this.surface.height = outerHeight * pixelRatio;

        this.ctx.scale(pixelRatio, pixelRatio);

        var options = {
            layout: layout,
            reverse: reverse,
            data: data,
            getIndex: getIndex,
            keys: keys,
            minValue: minValue,
            maxValue: maxValue,
            width: width,
            height: height,
            getColor: getColor,
            padding: padding,
            innerPadding: innerPadding,
            keyNames: keyNames,
            templates: templates
        };

        var result = groupMode === 'grouped' ? generateGroupedBars(options) : generateStackedBars(options);

        this.bars = result.bars;

        this.ctx.clearRect(0, 0, outerWidth, outerHeight);
        this.ctx.translate(margin.left, margin.top);

        renderAxesToCanvas(this.ctx, {
            xScale: result.xScale,
            yScale: result.yScale,
            width: width,
            height: height,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft
        });

        var _computeAxisTicks = computeAxisTicks({
            width: this.props.width,
            height: this.props.height,
            scale: result.xScale,
            position: 'bottom'
        }),
            y = _computeAxisTicks.y,
            ticks = _computeAxisTicks.ticks;

        result.bars.forEach(function (_ref) {
            var x = _ref.x,
                y = _ref.y,
                color = _ref.color,
                width = _ref.width,
                height = _ref.height;

            _this2.ctx.fillStyle = color;
            _this2.ctx.fillRect(x, y, width, height);
        });
    };

    BarCanvas.prototype.renderTicks = function renderTicks(templates, showTooltip, hideTooltip) {
        var _this3 = this;

        var _props = this.props,
            data = _props.data,
            keys = _props.keys,
            getIndex = _props.getIndex,
            minValue = _props.minValue,
            maxValue = _props.maxValue,
            keyNames = _props.keyNames,
            width = _props.width,
            height = _props.height,
            layout = _props.layout,
            reverse = _props.reverse,
            groupMode = _props.groupMode,
            padding = _props.padding,
            innerPadding = _props.innerPadding,
            getColor = _props.getColor;

        var options = {
            layout: layout,
            reverse: reverse,
            data: data,
            getIndex: getIndex,
            keys: keys,
            minValue: minValue,
            maxValue: maxValue,
            width: width,
            height: height,
            getColor: getColor,
            padding: padding,
            innerPadding: innerPadding,
            keyNames: keyNames,
            templates: templates
        };

        var result = groupMode === 'grouped' ? generateGroupedBars(options) : generateStackedBars(options);

        var _computeAxisTicks2 = computeAxisTicks({
            width: this.props.width,
            height: this.props.height,
            scale: result.xScale,
            position: 'bottom'
        }),
            y = _computeAxisTicks2.y,
            ticks = _computeAxisTicks2.ticks;

        var ticksTemplate = (ticks || []).map(function (_ref2, index) {
            var x = _ref2.x;

            return React.createElement(
                'div',
                {
                    className: 'bar-chart__axis',
                    key: x,
                    style: {
                        transform: 'translateX(' + (x + _this3.props.margin.left) + 'px)',
                        top: y + 15 + 'px'
                    }
                },
                React.createElement(
                    'div',
                    { className: 'bar-chart__axis-item' },
                    React.createElement('div', { dangerouslySetInnerHTML: { __html: templates[index] } })
                )
            );
        });
        return React.createElement(
            'div',
            { style: {
                    position: 'absolute',
                    height: height + 'px',
                    top: 0,
                    left: 0,
                    width: '100%',
                    paddingLeft: this.props.margin.left + 'px'
                } },
            ticksTemplate,
            layout === 'vertical' ? React.createElement(BarSlices, {
                theme: this.props.theme,
                slices: result.slices,
                margin: this.props.margin,
                showTooltip: showTooltip,
                hideTooltip: hideTooltip,
                width: result.slices[0].width,
                height: height,
                tooltipFormat: this.props.tooltipFormat
            }) : ''
        );
    };

    BarCanvas.prototype.render = function render() {
        var _this4 = this;

        var _props2 = this.props,
            outerWidth = _props2.outerWidth,
            outerHeight = _props2.outerHeight,
            pixelRatio = _props2.pixelRatio,
            isInteractive = _props2.isInteractive,
            theme = _props2.theme,
            enableTemplates = _props2.enableTemplates,
            templates = _props2.templates;

        return React.createElement(
            'div',
            null,
            React.createElement(
                Container,
                { isInteractive: isInteractive, theme: theme },
                function (_ref3) {
                    var showTooltip = _ref3.showTooltip,
                        hideTooltip = _ref3.hideTooltip;
                    return React.createElement(
                        'div',
                        { style: { position: 'relative' } },
                        React.createElement('canvas', {
                            ref: function ref(surface) {
                                _this4.surface = surface;
                            },
                            width: outerWidth * pixelRatio,
                            height: outerHeight * pixelRatio,
                            style: {
                                width: outerWidth,
                                height: outerHeight
                            },
                            onMouseEnter: _this4.handleMouseHover(showTooltip, hideTooltip),
                            onMouseMove: _this4.handleMouseHover(showTooltip, hideTooltip),
                            onMouseLeave: _this4.handleMouseLeave(hideTooltip),
                            onClick: _this4.handleClick
                        }),
                        enableTemplates ? _this4.renderTicks(templates, showTooltip, hideTooltip) : ''
                    );
                }
            )
        );
    };

    return BarCanvas;
}(Component);

BarCanvas.propTypes = BarPropTypes;

export default enhance(BarCanvas);