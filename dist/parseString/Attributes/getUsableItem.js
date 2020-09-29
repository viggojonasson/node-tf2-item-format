"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getKillstreak_1 = __importDefault(require("../../shared/getKillstreak"));
/**
 * Finds out which usable item it is
 * and its type
 * `output` or `target`
 * @param {string} name
 * @return {Object}
 */
function default_1(name) {
    // TODO: add series to itemNumber.
    // For chemistry sets the quality is predefined
    if (isStrangifierChemistrySet(name)) {
        return {
            target: name.replace(' Strangifier Chemistry Set', ''),
            output: 'Strangifier',
            outputQuality: 'Unique',
        };
    }
    if (isChemistrySet(name)) {
        return {
            output: name
                .replace(' Chemistry Set', '')
                .replace('Collector\'s ', ''),
            outputQuality: 'Collector\'s',
        };
    }
    const item = getItemIfTarget(name);
    if (item) {
        return {
            target: name
                .replace(` ${item}`, '')
                .replace(`${getKillstreak_1.default(name)} `, '')
                // Incase its uncraftable
                .replace('Non-Craftable ', '')
                // For Unusualifiers
                .replace('Unusual ', ''),
        };
    }
    return null;
}
exports.default = default_1;
;
function isStrangifierChemistrySet(name) {
    return / Strangifier Chemistry Set/.test(name);
}
function getItemIfTarget(name) {
    if (/(Killer's Kit|Coffin Kit|Summer Starter Kit)/.test(name))
        return;
    // eslint-disable-next-line consistent-return
    return (name.match(/ (Kit Fabricator|Kit|Strangifier|Unusualifier)/) || [])[1];
}
function isChemistrySet(name) {
    return / Chemistry Set/.test(name);
}
