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
        hideTooltip = _ref.hideTooltip;
    return React.createElement(
        'g',
        null,
        slices.map(function (slice) {
            return React.createElement(
                'g',
                null,
                React.createElement('line', {
                    stroke: '#e8e9e8',
                    style: { shapeRendering: 'crispEdges' },
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
                    x: slice.x,
                    width: width,
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