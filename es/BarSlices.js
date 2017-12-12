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
        margin = _ref.margin;
    return React.createElement(
        'div',
        { style: {
                width: '100%',
                height: '100%'
            } },
        slices.map(function (slice) {
            return React.createElement(
                'div',
                { key: slice.x },
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