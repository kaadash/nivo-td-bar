/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withPropsOnChange from 'recompose/withPropsOnChange';
import pure from 'recompose/pure';
import { BasicTooltip } from '@nivo/core';

var BarItem = function BarItem(_ref) {
    var data = _ref.data,
        x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        borderRadius = _ref.borderRadius,
        color = _ref.color,
        borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        label = _ref.label,
        shouldRenderLabel = _ref.shouldRenderLabel,
        labelColor = _ref.labelColor,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        onClick = _ref.onClick,
        tooltipFormat = _ref.tooltipFormat,
        theme = _ref.theme;

    var handleTooltip = function handleTooltip(e) {
        return showTooltip(React.createElement(BasicTooltip, {
            id: data.id + ' - ' + data.indexValue,
            value: data.value,
            enableChip: true,
            color: color,
            theme: theme,
            format: tooltipFormat,
            data: data
        }), e);
    };

    return React.createElement(
        'g',
        { transform: 'translate(' + x + ', ' + y + ')' },
        React.createElement('rect', {
            width: width,
            height: height,
            rx: borderRadius,
            ry: borderRadius,
            fill: data.fill ? data.fill : color,
            strokeWidth: borderWidth,
            stroke: borderColor,
            onMouseEnter: handleTooltip,
            onMouseMove: handleTooltip,
            onMouseLeave: hideTooltip,
            onClick: onClick
        }),
        shouldRenderLabel && React.createElement(
            'text',
            {
                x: width / 2,
                y: height / 2,
                textAnchor: 'middle',
                alignmentBaseline: 'central',
                style: {
                    pointerEvents: 'none',
                    fill: labelColor
                }
            },
            label
        )
    );
};

BarItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        indexValue: PropTypes.string.isRequired
    }).isRequired,

    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderRadius: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    shouldRenderLabel: PropTypes.bool.isRequired,
    labelColor: PropTypes.string.isRequired,

    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,

    theme: PropTypes.shape({
        tooltip: PropTypes.shape({}).isRequired
    }).isRequired
};

var enhance = compose(withPropsOnChange(['data', 'onClick'], function (_ref2) {
    var data = _ref2.data,
        _onClick = _ref2.onClick;
    return {
        onClick: function onClick(event) {
            return _onClick(data, event);
        }
    };
}), pure);

export default enhance(BarItem);