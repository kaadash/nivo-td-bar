'use strict';

exports.__esModule = true;
exports.BarDefaultProps = exports.BarPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                   * This file is part of the nivo project.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * Copyright 2016-present, Raphaël Benitte.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                   * file that was distributed with this source code.
                                                                                                                                                                                                                                                                   */


var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _core = require('@nivo/core');

var _BarItem = require('./BarItem');

var _BarItem2 = _interopRequireDefault(_BarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BarPropTypes = exports.BarPropTypes = _extends({
    // data
    data: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
    indexBy: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,
    getIndex: _propTypes2.default.func.isRequired, // computed
    keys: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,

    groupMode: _propTypes2.default.oneOf(['stacked', 'grouped']).isRequired,
    layout: _propTypes2.default.oneOf(['horizontal', 'vertical']).isRequired,
    reverse: _propTypes2.default.bool.isRequired,

    minValue: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.oneOf(['auto'])]).isRequired,
    maxValue: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.oneOf(['auto'])]).isRequired,
    padding: _propTypes2.default.number.isRequired,
    innerPadding: _propTypes2.default.number.isRequired,

    // axes & grid
    axisTop: _propTypes2.default.object,
    axisRight: _propTypes2.default.object,
    axisBottom: _propTypes2.default.object,
    axisLeft: _propTypes2.default.object,
    enableGridX: _propTypes2.default.bool.isRequired,
    enableGridY: _propTypes2.default.bool.isRequired,

    // customization
    barComponent: _propTypes2.default.func.isRequired,

    // labels
    enableLabel: _propTypes2.default.bool.isRequired,
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,
    labelFormat: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
    getLabel: _propTypes2.default.func.isRequired, // computed
    labelSkipWidth: _propTypes2.default.number.isRequired,
    labelSkipHeight: _propTypes2.default.number.isRequired,
    labelTextColor: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,
    getLabelTextColor: _propTypes2.default.func.isRequired, // computed
    labelLinkColor: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,
    getLabelLinkColor: _propTypes2.default.func.isRequired, // computed

    // styling
    borderRadius: _propTypes2.default.number.isRequired,
    getColor: _propTypes2.default.func.isRequired }, _core.defsPropTypes, {
    borderWidth: _propTypes2.default.number.isRequired,
    borderColor: _propTypes2.default.any.isRequired,
    getBorderColor: _propTypes2.default.func.isRequired,

    // interactivity
    isInteractive: _propTypes2.default.bool,
    onClick: _propTypes2.default.func.isRequired,
    tooltipFormat: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),

    // canvas specific
    pixelRatio: _propTypes2.default.number.isRequired
});

var BarDefaultProps = exports.BarDefaultProps = {
    indexBy: 'id',
    keys: ['value'],

    groupMode: 'stacked',
    layout: 'vertical',
    reverse: false,

    minValue: 'auto',
    maxValue: 'auto',
    padding: 0.1,
    innerPadding: 0,

    // axes & grid
    axisBottom: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: true,

    // customization
    barComponent: _BarItem2.default,

    // labels
    enableLabel: true,
    label: 'value',
    labelSkipWidth: 0,
    labelSkipHeight: 0,
    labelLinkColor: 'theme',
    labelTextColor: 'theme',

    defs: [],
    fill: [],
    templates: [],
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'inherit',

    // interactivity
    isInteractive: true,
    onClick: _core.noop,

    // canvas specific
    pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
};