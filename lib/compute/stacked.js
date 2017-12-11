'use strict';

exports.__esModule = true;
exports.generateStackedBars = exports.generateHorizontalStackedBars = exports.generateVerticalStackedBars = exports.getStackedScale = undefined;

var _lodash = require('lodash');

var _d3Scale = require('d3-scale');

var _d3Shape = require('d3-shape');

var _common = require('./common');

/**
 * Generates scale for stacked bar chart.
 *
 * @param {Array.<Object>} data
 * @param {number|string}  _minValue
 * @param {number|string}  _maxValue
 * @param {Array.<number>} range
 * @returns {Function}
 */
/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var getStackedScale = exports.getStackedScale = function getStackedScale(data, _minValue, _maxValue, range) {
    var allValues = (0, _lodash.flattenDepth)(data, 2);

    var minValue = _minValue;
    if (minValue === 'auto') {
        minValue = (0, _lodash.min)(allValues);
    }

    var maxValue = _maxValue;
    if (maxValue === 'auto') {
        maxValue = (0, _lodash.max)(allValues);
    }

    return (0, _d3Scale.scaleLinear)().rangeRound(range).domain([minValue, maxValue]);
};

/**
 * Generates x/y scales & bars for vertical stacked bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Function}       getIndex
 * @param {Array.<string>} keys
 * @param {Array.<Object>} keyNames
 * @param {Array.<Object>} templates
 * @param {number}         minValue
 * @param {number}         maxValue
 * @param {boolean}        reverse
 * @param {number}         width
 * @param {number}         height
 * @param {Function}       getColor
 * @param {number}         [padding=0]
 * @param {number}         [innerPadding=0]
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
var generateVerticalStackedBars = exports.generateVerticalStackedBars = function generateVerticalStackedBars(_ref) {
    var data = _ref.data,
        getIndex = _ref.getIndex,
        keys = _ref.keys,
        minValue = _ref.minValue,
        keyNames = _ref.keyNames,
        templates = _ref.templates,
        maxValue = _ref.maxValue,
        reverse = _ref.reverse,
        width = _ref.width,
        height = _ref.height,
        getColor = _ref.getColor,
        _ref$padding = _ref.padding,
        padding = _ref$padding === undefined ? 0 : _ref$padding,
        _ref$innerPadding = _ref.innerPadding,
        innerPadding = _ref$innerPadding === undefined ? 0 : _ref$innerPadding;

    var stackedData = (0, _d3Shape.stack)().keys(keys).offset(_d3Shape.stackOffsetDiverging)(data);

    var xScale = (0, _common.getIndexedScale)(data, getIndex, [0, width], padding);
    var yRange = reverse ? [0, height] : [height, 0];
    var yScale = getStackedScale(stackedData, minValue, maxValue, yRange);

    var bars = [];
    var barWidth = xScale.bandwidth();

    var getY = function getY(d) {
        return yScale(d[1]);
    };
    var getHeight = function getHeight(d, y) {
        return yScale(d[0]) - y;
    };
    if (reverse) {
        getY = function getY(d) {
            return yScale(d[0]);
        };
        getHeight = function getHeight(d, y) {
            return yScale(d[1]) - y;
        };
    }

    if (barWidth > 0) {
        stackedData.forEach(function (stackedDataItem) {
            xScale.domain().forEach(function (index, i) {
                var d = stackedDataItem[i];
                var x = xScale(getIndex(d.data));

                var y = getY(d);
                var barHeight = getHeight(d, y);
                if (innerPadding > 0) {
                    y += innerPadding * 0.5;
                    barHeight -= innerPadding;
                }

                if (barHeight > 0) {
                    var barData = {
                        id: stackedDataItem.key,
                        value: d.data[stackedDataItem.key],
                        keyNames: keyNames,
                        keyName: keyNames[stackedDataItem.key],
                        template: templates[i],
                        index: i,
                        indexValue: index,
                        data: d.data
                    };

                    bars.push({
                        key: stackedDataItem.key + '.' + index,
                        data: barData,
                        x: x,
                        y: y,
                        width: barWidth,
                        height: barHeight,
                        color: getColor(barData)
                    });
                }
            });
        });
    }

    return { xScale: xScale, yScale: yScale, bars: bars, groupBarsWidth: barWidth };
};

/**
 * Generates x/y scales & bars for horizontal stacked bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Function}       getIndex
 * @param {Array.<string>} keys
 * @param {Array.<Object>} keyNames
 * @param {number}         minValue
 * @param {number}         maxValue
 * @param {boolean}        reverse
 * @param {number}         width
 * @param {number}         height
 * @param {Function}       getColor
 * @param {number}         [padding=0]
 * @param {number}         [innerPadding=0]
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
var generateHorizontalStackedBars = exports.generateHorizontalStackedBars = function generateHorizontalStackedBars(_ref2) {
    var data = _ref2.data,
        getIndex = _ref2.getIndex,
        keys = _ref2.keys,
        minValue = _ref2.minValue,
        maxValue = _ref2.maxValue,
        reverse = _ref2.reverse,
        width = _ref2.width,
        height = _ref2.height,
        getColor = _ref2.getColor,
        keyNames = _ref2.keyNames,
        _ref2$padding = _ref2.padding,
        padding = _ref2$padding === undefined ? 0 : _ref2$padding,
        _ref2$innerPadding = _ref2.innerPadding,
        innerPadding = _ref2$innerPadding === undefined ? 0 : _ref2$innerPadding;

    var stackedData = (0, _d3Shape.stack)().keys(keys).offset(_d3Shape.stackOffsetDiverging)(data);

    var xRange = reverse ? [width, 0] : [0, width];
    var xScale = getStackedScale(stackedData, minValue, maxValue, xRange);
    var yScale = (0, _common.getIndexedScale)(data, getIndex, [height, 0], padding);

    var bars = [];
    var barHeight = yScale.bandwidth();

    var getX = function getX(d) {
        return xScale(d[0]);
    };
    var getWidth = function getWidth(d, x) {
        return xScale(d[1]) - x;
    };
    if (reverse) {
        getX = function getX(d) {
            return xScale(d[1]);
        };
        getWidth = function getWidth(d, y) {
            return xScale(d[0]) - y;
        };
    }

    if (barHeight > 0) {
        stackedData.forEach(function (stackedDataItem) {
            yScale.domain().forEach(function (index, i) {
                var d = stackedDataItem[i];
                var y = yScale(getIndex(d.data));

                var barData = {
                    id: stackedDataItem.key,
                    value: d.data[stackedDataItem.key],
                    index: i,
                    keyName: keyNames[stackedDataItem.key],
                    keyNames: keyNames,
                    indexValue: index,
                    data: d.data
                };

                var x = getX(d);
                var barWidth = getWidth(d, x);
                if (innerPadding > 0) {
                    x += innerPadding * 0.5;
                    barWidth -= innerPadding;
                }

                if (barWidth > 0) {
                    bars.push({
                        key: stackedDataItem.key + '.' + index,
                        data: barData,
                        x: x,
                        y: y,
                        width: barWidth,
                        height: barHeight,
                        color: getColor(barData)
                    });
                }
            });
        });
    }

    return { xScale: xScale, yScale: yScale, bars: bars };
};

/**
 * Generates x/y scales & bars for stacked bar chart.
 *
 * @param {Object} options
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
var generateStackedBars = exports.generateStackedBars = function generateStackedBars(options) {
    return options.layout === 'vertical' ? generateVerticalStackedBars(options) : generateHorizontalStackedBars(options);
};