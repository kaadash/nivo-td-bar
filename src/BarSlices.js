/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import BarSlicesItem from './BarSlicesItem'

const BarSlices = ({ slices, height, width, theme, tooltipFormat, showTooltip, hideTooltip, margin }) => (
    <div style={{
      width: '100%',
      height: '100%',
    }}>
        {slices.map(slice => (
            <div key={slice.x}>
                <BarSlicesItem
                    slice={slice}
                    theme={theme}
                    showTooltip={showTooltip}
                    hideTooltip={hideTooltip}
                    x={slice.x}
                    width={width}
                    height={height}
                    tooltipFormat={tooltipFormat}
                />
            </div>
        ))}
    </div>
)

BarSlices.propTypes = {
    slices: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            width: PropTypes.number,
        })
    ).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default pure(BarSlices)
