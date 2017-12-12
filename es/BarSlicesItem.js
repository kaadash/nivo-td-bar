import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import { TableTooltip } from '@nivo/core';

var hoverColor = '#e8e9e8';

var BarSlicesItem = function BarSlicesItem(_ref) {
    var slice = _ref.slice,
        x = _ref.x,
        height = _ref.height,
        width = _ref.width,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        isHover = _ref.isHover;

    return React.createElement('rect', {
        x: x,
        fill: 'black',
        fillOpacity: isHover ? 0.05 : 0,
        height: height,
        width: width,
        onMouseEnter: showTooltip,
        onMouseMove: showTooltip,
        onMouseLeave: hideTooltip
    });
};

BarSlicesItem.propTypes = {
    slice: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    isHover: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired
};

var Chip = function Chip(_ref2) {
    var color = _ref2.color;
    return React.createElement('span', {
        style: {
            display: 'block',
            borderRadius: '50%',
            width: '6px',
            height: '6px',
            background: color
        }
    });
};

var enhance = compose(withState('isHover', 'setIsHover', false), withPropsOnChange(['slice', 'theme', 'tooltipFormat'], function (_ref3) {
    var slice = _ref3.slice,
        theme = _ref3.theme,
        tooltipFormat = _ref3.tooltipFormat;

    return {
        tooltip: React.createElement(TableTooltip, { theme: theme,
            template: slice.data.template,
            rows: slice.tooltipData.map(function (_ref4) {
                var name = _ref4.name,
                    value = _ref4.value,
                    format = _ref4.format,
                    color = _ref4.color;

                return [React.createElement(Chip, { color: color }), name, tooltipFormat ? tooltipFormat(value, format) : value];
            }) })
    };
}), withHandlers({
    showTooltip: function showTooltip(_ref5) {
        var _showTooltip = _ref5.showTooltip,
            setIsHover = _ref5.setIsHover,
            tooltip = _ref5.tooltip;
        return function (e) {
            setIsHover(true);
            _showTooltip(tooltip, e);
        };
    },
    hideTooltip: function hideTooltip(_ref6) {
        var _hideTooltip = _ref6.hideTooltip,
            setIsHover = _ref6.setIsHover;
        return function () {
            setIsHover(false);
            _hideTooltip();
        };
    }
}), pure);

export default enhance(BarSlicesItem);