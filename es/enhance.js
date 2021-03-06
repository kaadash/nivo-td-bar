/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *d
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withPropsOnChange from 'recompose/withPropsOnChange';
import pure from 'recompose/pure';
import { withTheme, withColors, withDimensions, withMotion } from '@nivo/core';
import { getInheritedColorGenerator } from '@nivo/core';
import { getAccessorFor, getLabelGenerator } from '@nivo/core';
import { BarDefaultProps } from './props';

export default (function (Component) {
    return compose(defaultProps(BarDefaultProps), withTheme(), withColors(), withDimensions(), withMotion(), withPropsOnChange(['indexBy'], function (_ref) {
        var indexBy = _ref.indexBy;
        return {
            getIndex: getAccessorFor(indexBy)
        };
    }), withPropsOnChange(['labelTextColor'], function (_ref2) {
        var labelTextColor = _ref2.labelTextColor;
        return {
            getLabelTextColor: getInheritedColorGenerator(labelTextColor, 'axis.textColor')
        };
    }), withPropsOnChange(['labelLinkColor'], function (_ref3) {
        var labelLinkColor = _ref3.labelLinkColor;
        return {
            getLabelLinkColor: getInheritedColorGenerator(labelLinkColor, 'axis.tickColor')
        };
    }), withPropsOnChange(['label', 'labelFormat'], function (_ref4) {
        var label = _ref4.label,
            labelFormat = _ref4.labelFormat;
        return {
            getLabel: getLabelGenerator(label, labelFormat)
        };
    }), withPropsOnChange(['borderColor'], function (_ref5) {
        var borderColor = _ref5.borderColor;
        return {
            getBorderColor: getInheritedColorGenerator(borderColor)
        };
    }), pure)(Component);
});