var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { bindDefs } from '@nivo/core';
import { generateGroupedBars, generateStackedBars } from './compute';
import setDisplayName from 'recompose/setDisplayName';
import enhance from './enhance';
import { BarPropTypes } from './props';
import BarSlices from './BarSlices';
import { Container, SvgWrapper } from '@nivo/core';
import { Grid, Axes } from '@nivo/core';
import { CartesianMarkers, computeAxisTicks } from '@nivo/core';

var barWillEnterHorizontal = function barWillEnterHorizontal(_ref) {
    var style = _ref.style;
    return {
        x: style.x.val,
        y: style.y.val,
        width: 0,
        height: style.height.val
    };
};

var barWillEnterVertical = function barWillEnterVertical(_ref2) {
    var style = _ref2.style;
    return {
        x: style.x.val,
        y: style.y.val + style.height.val,
        width: style.width.val,
        height: 0
    };
};

var barWillLeaveHorizontal = function barWillLeaveHorizontal(springConfig) {
    return function (_ref3) {
        var style = _ref3.style;
        return {
            x: style.x,
            y: style.y,
            width: spring(0, springConfig),
            height: style.height
        };
    };
};

var barWillLeaveVertical = function barWillLeaveVertical(springConfig) {
    return function (_ref4) {
        var style = _ref4.style;
        return {
            x: style.x,
            y: spring(style.y.val + style.height.val, springConfig),
            width: style.width,
            height: spring(0, springConfig)
        };
    };
};

var Bar = function Bar(_ref5) {
    var data = _ref5.data,
        getIndex = _ref5.getIndex,
        keys = _ref5.keys,
        keyNames = _ref5.keyNames,
        templates = _ref5.templates,
        enableTemplates = _ref5.enableTemplates,
        axisFormat = _ref5.axisFormat,
        groupMode = _ref5.groupMode,
        layout = _ref5.layout,
        reverse = _ref5.reverse,
        minValue = _ref5.minValue,
        maxValue = _ref5.maxValue,
        margin = _ref5.margin,
        width = _ref5.width,
        height = _ref5.height,
        outerWidth = _ref5.outerWidth,
        outerHeight = _ref5.outerHeight,
        padding = _ref5.padding,
        innerPadding = _ref5.innerPadding,
        axisTop = _ref5.axisTop,
        axisRight = _ref5.axisRight,
        axisBottom = _ref5.axisBottom,
        axisLeft = _ref5.axisLeft,
        enableGridX = _ref5.enableGridX,
        enableGridY = _ref5.enableGridY,
        barComponent = _ref5.barComponent,
        enableLabel = _ref5.enableLabel,
        getLabel = _ref5.getLabel,
        labelSkipWidth = _ref5.labelSkipWidth,
        labelSkipHeight = _ref5.labelSkipHeight,
        getLabelTextColor = _ref5.getLabelTextColor,
        markers = _ref5.markers,
        theme = _ref5.theme,
        getColor = _ref5.getColor,
        defs = _ref5.defs,
        fill = _ref5.fill,
        borderRadius = _ref5.borderRadius,
        borderWidth = _ref5.borderWidth,
        getBorderColor = _ref5.getBorderColor,
        animate = _ref5.animate,
        motionStiffness = _ref5.motionStiffness,
        motionDamping = _ref5.motionDamping,
        isInteractive = _ref5.isInteractive,
        tooltipFormat = _ref5.tooltipFormat,
        onClick = _ref5.onClick;

    var options = {
        layout: layout,
        reverse: reverse,
        data: data,
        getIndex: getIndex,
        keys: keys,
        keyNames: keyNames,
        templates: templates,
        minValue: minValue,
        maxValue: maxValue,
        width: width,
        height: height,
        getColor: getColor,
        padding: padding,
        innerPadding: innerPadding
    };
    var result = groupMode === 'grouped' ? generateGroupedBars(options) : generateStackedBars(options);

    var motionProps = {
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness
    };

    var springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness
    };

    var willEnter = layout === 'vertical' ? barWillEnterVertical : barWillEnterHorizontal;
    var willLeave = layout === 'vertical' ? barWillLeaveVertical(springConfig) : barWillLeaveHorizontal(springConfig);

    var shouldRenderLabel = function shouldRenderLabel(_ref6) {
        var width = _ref6.width,
            height = _ref6.height;

        if (!enableLabel) return false;
        if (labelSkipWidth > 0 && width < labelSkipWidth) return false;
        if (labelSkipHeight > 0 && height < labelSkipHeight) return false;
        return true;
    };

    var boundDefs = bindDefs(defs, result.bars, fill, {
        dataKey: 'data',
        targetKey: 'data.fill'
    });

    var _computeAxisTicks = computeAxisTicks({
        width: width,
        height: height,
        scale: result.xScale,
        position: 'bottom'
    }),
        y = _computeAxisTicks.y,
        ticks = _computeAxisTicks.ticks;

    var renderTicks = function renderTicks(templates) {
        return ticks.map(function (_ref7, index) {
            var x = _ref7.x;

            return React.createElement(
                'div',
                {
                    className: 'bar-chart__axis',
                    key: x,
                    style: {
                        transform: 'translateX(' + (x + margin.left) + 'px)',
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
    };
    console.log(axisFormat);

    return React.createElement(
        'div',
        null,
        React.createElement(
            Container,
            { isInteractive: isInteractive, theme: theme },
            function (_ref8) {
                var showTooltip = _ref8.showTooltip,
                    hideTooltip = _ref8.hideTooltip;

                var commonProps = {
                    borderRadius: borderRadius,
                    borderWidth: borderWidth,
                    enableLabel: enableLabel,
                    labelSkipWidth: labelSkipWidth,
                    labelSkipHeight: labelSkipHeight,
                    showTooltip: showTooltip,
                    hideTooltip: hideTooltip,
                    onClick: onClick,
                    theme: theme,
                    tooltipFormat: tooltipFormat
                };

                var bars = void 0;
                if (animate === true) {
                    bars = React.createElement(
                        TransitionMotion,
                        {
                            willEnter: willEnter,
                            willLeave: willLeave,
                            styles: result.bars.map(function (bar) {
                                return {
                                    key: bar.key,
                                    data: bar,
                                    style: {
                                        x: spring(bar.x, springConfig),
                                        y: spring(bar.y, springConfig),
                                        width: spring(bar.width, springConfig),
                                        height: spring(bar.height, springConfig)
                                    }
                                };
                            })
                        },
                        function (interpolatedStyles) {
                            return React.createElement(
                                'g',
                                null,
                                interpolatedStyles.map(function (_ref9) {
                                    var key = _ref9.key,
                                        style = _ref9.style,
                                        bar = _ref9.data;

                                    var baseProps = _extends({}, bar, style);

                                    return React.createElement(barComponent, _extends({
                                        key: key
                                    }, baseProps, commonProps, {
                                        shouldRenderLabel: shouldRenderLabel(baseProps),
                                        width: Math.max(style.width, 0),
                                        height: Math.max(style.height, 0),
                                        label: getLabel(bar.data),
                                        labelColor: getLabelTextColor(baseProps, theme),
                                        borderColor: getBorderColor(baseProps)
                                    }));
                                })
                            );
                        }
                    );
                } else {
                    bars = result.bars.map(function (d) {
                        return React.createElement(barComponent, _extends({
                            key: d.key
                        }, d, commonProps, {
                            label: getLabel(d.data),
                            shouldRenderLabel: shouldRenderLabel(d),
                            labelColor: getLabelTextColor(d, theme),
                            borderColor: getBorderColor(d)
                        }));
                    });
                }

                return React.createElement(
                    SvgWrapper,
                    {
                        width: outerWidth,
                        height: outerHeight,
                        margin: margin,
                        defs: boundDefs
                    },
                    React.createElement(Grid, _extends({
                        theme: theme,
                        width: width,
                        height: height,
                        xScale: enableGridX ? result.xScale : null,
                        yScale: enableGridY ? result.yScale : null
                    }, motionProps)),
                    React.createElement(Axes, _extends({
                        xScale: result.xScale,
                        yScale: result.yScale,
                        width: width,
                        enableTemplates: enableTemplates,
                        format: tooltipFormat,
                        axisFormat: axisFormat,
                        height: height,
                        theme: theme,
                        top: axisTop,
                        right: axisRight,
                        bottom: axisBottom,
                        left: axisLeft
                    }, motionProps)),
                    bars,
                    layout === 'vertical' ? React.createElement(BarSlices, {
                        paddingInPixel: result.paddingInPixel,
                        theme: theme,
                        slices: result.slices,
                        showTooltip: showTooltip,
                        hideTooltip: hideTooltip,
                        width: result.slices[0].width,
                        height: height,
                        tooltipFormat: tooltipFormat
                    }) : '',
                    React.createElement(CartesianMarkers, {
                        markers: markers,
                        width: width,
                        height: height,
                        xScale: result.xScale,
                        yScale: result.yScale,
                        theme: theme
                    })
                );
            }
        ),
        enableTemplates && layout === 'vertical' ? renderTicks(templates) : ''
    );
};

Bar.propTypes = BarPropTypes;

export default setDisplayName('Bar')(enhance(Bar));