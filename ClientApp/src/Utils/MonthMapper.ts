import text from "../Texts";
import React from "react";
import {Select} from "antd";

export const MONTH_INT_MAP = new Map<Number, string>([
    [1, text.months.jan],
    [2, text.months.feb],
    [3, text.months.mar],
    [4, text.months.apr],
    [5, text.months.may],
    [6, text.months.jun],
    [7, text.months.jul],
    [8, text.months.aug],
    [9, text.months.sep],
    [10, text.months.oct],
    [11, text.months.nov],
    [12, text.months.dec],
]);