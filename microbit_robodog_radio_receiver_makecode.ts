// MakeCode JavaScript — RoboDog에 장착하는 라디오 수신 micro:bit
// 전원은 RoboDog에서 공급받습니다. 이 보드는 PC USB 시리얼을 사용하지 않습니다.
// 관측소 송신 micro:bit와 radio group 1을 사용합니다.

radio.setGroup(1)

function isStationSignal(message: string): boolean {
    if (message.length != 2) return false

    let type = message.charAt(0)
    let station = message.charAt(1)
    let validType =
        type == "E" || type == "F" || type == "G" ||
        type == "H" || type == "O"
    let validStation = station == "1" || station == "2"

    return validType && validStation
}

radio.onReceivedString(function (message) {
    let signal = message.trim().toUpperCase()
    if (isStationSignal(signal)) {
        basic.showString(signal)
    } else {
        basic.showIcon(IconNames.No)
    }
})

basic.showString("RDY")
basic.forever(function () {
    basic.pause(100)
})
