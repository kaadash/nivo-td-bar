'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _BarSlicesItem = require('./BarSlicesItem');

var _BarSlicesItem2 = _interopRequireDefault(_BarSlicesItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var BarSlices = function BarSlices(_ref) {
    var slices = _ref.slices,
        height = _ref.height,
        width = _ref.width,
        theme = _ref.theme,
        tooltipFormat = _ref.tooltipFormat,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        _ref$paddingInPixel = _ref.paddingInPixel,
        paddingInPixel = _ref$paddingInPixel === undefined ? 0 : _ref$paddingInPixel;
    return _react2.default.createElement(
        'g',
        null,
        slices.map(function (slice, index) {
            return _react2.default.createElement(
                'g',
                { key: slice.x },
                _react2.default.createElement('line', {
                    stroke: '#e8e9e8',
                    style: {
                        shapeRendering: 'crispEdges',
                        strokeWidth: index !== 0 ? 1 : 0
                    },
                    x1: slice.x,
                    x2: slice.x,
                    y1: 0,
                    y2: height
                }),
                _react2.default.createElement(_BarSlicesItem2.default, {
                    slice: slice,
                    theme: theme,
                    showTooltip: showTooltip,
                    hideTooltip: hideTooltip,
                    x: slice.x - (index === 0 ? paddingInPixel - 5 : 0),
                    width: width + (index === 0 ? paddingInPixel - 5 : 0),
                    height: height,
                    tooltipFormat: tooltipFormat
                })
            );
        })
    );
};

BarSlices.propTypes = {
    slices: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        x: _propTypes2.default.number.isRequired,
        width: _propTypes2.default.number
    })).isRequired,
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired
};

exports.default = (0, _pure2.default)(BarSlices);