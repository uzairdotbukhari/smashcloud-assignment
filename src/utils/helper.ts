import { locationPointKMs } from "./constants";
import { CostSummary } from "./interfaces";
import moment from "moment"

const getTotalKMs = (entrance: string, exit: string): number => {
    let startIdx = Object.keys(locationPointKMs).findIndex(el => el === entrance);
    let endIdx = Object.keys(locationPointKMs).findIndex(el => el === exit);

    // assuming ring road is circular so what if car
    // entered from mid of ring road and exited from
    // location before it's entrance
    if (startIdx > endIdx) {
        let halfCircleKMs = locationPointKMs[Object.keys(locationPointKMs)[Object.keys(locationPointKMs).length - 1]] - locationPointKMs[entrance]
        let secondHalfKMs = locationPointKMs[exit]
        return halfCircleKMs + secondHalfKMs as number
    }
    // else we are calculate distance from point
    // entrance to exit
    else {
        return locationPointKMs[exit] - locationPointKMs[entrance] as number
    }
}

export const getBreakDownCost = (entrance: string, exit: string, numberPlate: string, entryDateTime: string): CostSummary => {
    let baseRate = 20
    let pricePerKM = 0.2
    let totalKMs = getTotalKMs(entrance, exit)
    let discount = 0

    // ====> check for point 3:
    if (moment(entryDateTime).format("ddd") === "Sat" ||
        moment(entryDateTime).format("ddd") === "Sun") {
        pricePerKM = pricePerKM * 1.5
    }
    
    // calculating subTotal after confirming final
    // price per KM
    let subTotal = baseRate + (totalKMs * pricePerKM)

    // ====> check for point 4:
    // For Mon and Wed, cars with even number in
    // number plate will be given 10% discount
    // based on entrance date and time
    if ((parseInt(numberPlate) % 2) === 0 &&
        (moment(entryDateTime).format("ddd") === "Mon" ||
            moment(entryDateTime).format("ddd") === "Wed")) {
        discount = subTotal * 0.1
    }
    // For Tues and Thurs, cars with odd number in
    // number plate will be given 10% discount
    // based on entrance date and time
    else if ((parseInt(numberPlate) % 2) !== 0 &&
        (moment(entryDateTime).format("ddd") === "Tue" ||
            moment(entryDateTime).format("ddd") === "Thu")) {
        discount = subTotal * 0.1
    }

    // ====> check for point 5
    // On 3 national holidays discount will be given
    // of 50% (23rd march, 14th August, and 25th
    // December)
    if (moment(entryDateTime).format("DD-MM") === "23-03" ||
        moment(entryDateTime).format("DD-MM") === "14-08" ||
        moment(entryDateTime).format("DD-MM") === "25-15") {
        discount = discount + (subTotal * 0.5) // additional 50% discount
    }

    return {
        subTotal,
        baseRate,
        discount,
        totalKMs,
        total: (baseRate + totalKMs * pricePerKM) - discount
    }
}

