/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { range, min, max, map, isNumber } from 'lodash-es';
import { scaleLinear } from 'd3-scale';
import { getIndexedScale } from './common';

/**
 * Generates scale for grouped bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Array.<string>} keys
 * @param {number}         _minValue
 * @param {number|string}  _maxValue
 * @param {Array.<number>} range
 * @returns {Function}
 */
export var getGroupedScale = function getGroupedScale(data, keys, _minValue, _maxValue, range) {
    var allValues = data.reduce(function (acc, entry) {
        return [].concat(acc, keys.map(function (k) {
            return entry[k];
        }));
    }, []);

    var maxValue = _maxValue;
    if (maxValue === 'auto') {
        maxValue = max(allValues);
    }

    var minValue = _minValue;
    if (minValue === 'auto') {
        minValue = min(allValues);
        if (minValue > 0) minValue = 0;
    }

    return scaleLinear().rangeRound(range).domain([minValue, maxValue]);
};

/**
 * Generates x/y scales & bars for vertical grouped bar chart.
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
export var generateVerticalGroupedBars = function generateVerticalGroupedBars(_ref) {
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

    var xScale = getIndexedScale(data, getIndex, [0, width], padding);
    var yRange = reverse ? [0, height] : [height, 0];
    var yScale = getGroupedScale(data, keys, minValue, maxValue, yRange);
    var barWidth = (xScale.bandwidth() - innerPadding * (keys.length - 1)) / keys.length;
    var yRef = yScale(0);

    var getY = function getY(d) {
        return d > 0 ? yScale(d) : yRef;
    };
    var getHeight = function getHeight(d, y) {
        return d > 0 ? yRef - y : yScale(d) - yRef;
    };
    if (reverse) {
        getY = function getY(d) {
            return d < 0 ? yScale(d) : yRef;
        };
        getHeight = function getHeight(d, y) {
            return d < 0 ? yRef - y : yScale(d) - yRef;
        };
    }
    var paddingInPixel = width * padding / xScale.domain().length;

    var bars = [];
    var slices = [];
    if (barWidth > 0) {
        keys.forEach(function (key, i) {
            range(xScale.domain().length).forEach(function (index) {
                var x = xScale(getIndex(data[index])) + barWidth * i + innerPadding * i;
                var y = getY(data[index][key]);
                var barHeight = getHeight(data[index][key], y);
                var template = templates[index];

                var barData = {
                    id: key,
                    value: data[index][key],
                    index: index,
                    template: template,
                    keyNames: keyNames,
                    keyName: keyNames[key],
                    indexValue: getIndex(data[index]),
                    data: data[index]
                };

                bars.push({
                    key: key + '.' + barData.indexValue,
                    data: barData,
                    x: x,
                    y: y,
                    width: barWidth,
                    height: barHeight,
                    color: getColor(barData)
                });
                if (i === 0) {
                    var tooltipData = map(keyNames, function (keyName, key) {
                        return {
                            name: keyName.name,
                            value: data[index][key],
                            format: keyName.format,
                            color: getColor(Object.assign({}, data[index][key], {
                                id: key
                            }))
                        };
                    }).filter(function (_ref2) {
                        var value = _ref2.value;

                        return isNumber(value);
                    });
                    slices.push({
                        key: key + '.' + barData.indexValue,
                        data: barData,
                        tooltipData: tooltipData,
                        x: x - paddingInPixel / 2,
                        y: y,
                        width: barWidth * tooltipData.length + paddingInPixel,
                        height: barHeight,
                        color: getColor(barData)
                    });
                }
            });
        });
    }

    return { xScale: xScale, yScale: yScale, bars: bars, slices: slices, paddingInPixel: paddingInPixel };
};

/**
 * Generates x/y scales & bars for horizontal grouped bar chart.
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
export var generateHorizontalGroupedBars = function generateHorizontalGroupedBars(_ref3) {
    var data = _ref3.data,
        getIndex = _ref3.getIndex,
        keys = _ref3.keys,
        minValue = _ref3.minValue,
        maxValue = _ref3.maxValue,
        keyNames = _ref3.keyNames,
        reverse = _ref3.reverse,
        width = _ref3.width,
        height = _ref3.height,
        getColor = _ref3.getColor,
        _ref3$padding = _ref3.padding,
        padding = _ref3$padding === undefined ? 0 : _ref3$padding,
        _ref3$innerPadding = _ref3.innerPadding,
        innerPadding = _ref3$innerPadding === undefined ? 0 : _ref3$innerPadding;

    var xRange = reverse ? [width, 0] : [0, width];
    var xScale = getGroupedScale(data, keys, minValue, maxValue, xRange);
    var yScale = getIndexedScale(data, getIndex, [height, 0], padding);

    var barHeight = (yScale.bandwidth() - innerPadding * (keys.length - 1)) / keys.length;
    var xRef = xScale(0);

    var getX = function getX(d) {
        return d > 0 ? xRef : xScale(d);
    };
    var getWidth = function getWidth(d, x) {
        return d > 0 ? xScale(d) - xRef : xRef - x;
    };
    if (reverse) {
        getX = function getX(d) {
            return d < 0 ? xRef : xScale(d);
        };
        getWidth = function getWidth(d, x) {
            return d < 0 ? xScale(d) - xRef : xRef - x;
        };
    }

    var bars = [];
    if (barHeight > 0) {
        keys.forEach(function (key, i) {
            range(yScale.domain().length).forEach(function (index) {
                var x = getX(data[index][key]);
                var y = yScale(getIndex(data[index])) + barHeight * i + innerPadding * i;
                var barWidth = getWidth(data[index][key], x);

                if (barWidth > 0) {
                    var barData = {
                        id: key,
                        value: data[index][key],
                        index: index,
                        keyName: keyNames[key],
                        keyNames: keyNames,
                        indexValue: getIndex(data[index]),
                        data: data[index]
                    };

                    bars.push({
                        key: key + '.' + barData.indexValue,
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
 * Generates x/y scales & bars for grouped bar chart.
 *
 * @param {Object} options
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export var generateGroupedBars = function generateGroupedBars(options) {
    return options.layout === 'vertical' ? generateVerticalGroupedBars(options) : generateHorizontalGroupedBars(options);
};