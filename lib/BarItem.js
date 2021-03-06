'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _withPropsOnChange = require('recompose/withPropsOnChange');

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _core = require('@nivo/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
        return showTooltip(_react2.default.createElement(_core.BasicTooltip, {
            id: data.id + ' - ' + data.indexValue,
            value: data.value,
            enableChip: true,
            color: color,
            theme: theme,
            format: tooltipFormat,
            data: data
        }), e);
    };

    return _react2.default.createElement(
        'g',
        { transform: 'translate(' + x + ', ' + y + ')' },
        _react2.default.createElement('rect', {
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
        shouldRenderLabel && _react2.default.createElement(
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
    data: _propTypes2.default.shape({
        id: _propTypes2.default.string.isRequired,
        value: _propTypes2.default.number.isRequired,
        indexValue: _propTypes2.default.string.isRequired
    }).isRequired,

    x: _propTypes2.default.number.isRequired,
    y: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    color: _propTypes2.default.string.isRequired,
    borderRadius: _propTypes2.default.number.isRequired,
    borderWidth: _propTypes2.default.number.isRequired,
    borderColor: _propTypes2.default.string.isRequired,

    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
    shouldRenderLabel: _propTypes2.default.bool.isRequired,
    labelColor: _propTypes2.default.string.isRequired,

    tooltipFormat: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    showTooltip: _propTypes2.default.func.isRequired,
    hideTooltip: _propTypes2.default.func.isRequired,

    theme: _propTypes2.default.shape({
        tooltip: _propTypes2.default.shape({}).isRequired
    }).isRequired
};

var enhance = (0, _compose2.default)((0, _withPropsOnChange2.default)(['data', 'onClick'], function (_ref2) {
    var data = _ref2.data,
        _onClick = _ref2.onClick;
    return {
        onClick: function onClick(event) {
            return _onClick(data, event);
        }
    };
}), _pure2.default);

exports.default = enhance(BarItem);