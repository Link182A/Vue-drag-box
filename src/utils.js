import CONSTANTS from './const';
import ShortUniqueId from "short-unique-id";
const uuid = new ShortUniqueId();

export const dotsUtil = (config) => {
    return [
        {
            id: uuid.randomUUID(8),
            active: false,
            y: config.y
        },
        {
            id: uuid.randomUUID(8),
            active: false,
            y: config.y + CONSTANTS.RECT_SIZE
        },
        {
            id: uuid.randomUUID(8),
            active: false,
            x: config.x
        },
        {
            id: uuid.randomUUID(8),
            active: false,
            x: config.x + CONSTANTS.RECT_SIZE
        }
    ]
}