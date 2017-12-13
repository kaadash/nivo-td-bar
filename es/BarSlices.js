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
import pure from 'recompose/pure';
import BarSlicesItem from './BarSlicesItem';

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
    return React.createElement(
        'g',
        null,
        slices.map(function (slice, index) {
            return React.createElement(
                'g',
                { key: slice.x },
                React.createElement('line', {
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
                React.createElement(BarSlicesItem, {
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
    slices: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        width: PropTypes.number
    })).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

export default pure(BarSlices);