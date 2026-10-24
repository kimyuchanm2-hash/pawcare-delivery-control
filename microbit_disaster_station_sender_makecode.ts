// MakeCode JavaScript — 관측소 1 센서 송신 micro:bit
// USB 시리얼은 PC(COM17), 라디오는 로보독 장착 micro:bit와 통신합니다.
// 라디오 그룹은 두 micro:bit 모두 1로 맞춥니다.
// 신호: E=흔들림(지진), F=화재, G=가스, H=무더위

const STATION_ID = 1
const GAS_DANGER = 800

radio.setGroup(1)
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)

let lastSensorSignal = ""
let lastEarthquakeTime = -5000

function sendEmergency(signal: string) {
    // 관측소 → PC Python(COM17) → HTML 관제
    serial.writeLine("EMERGENCY:" + signal)
    // 관측소 → 로보독에 장착된 수신 micro:bit
    radio.sendString(signal)
    basic.showString(signal)
}

input.onGesture(Gesture.Shake, function () {
    if (input.runningTime() - lastEarthquakeTime > 5000) {
        lastEarthquakeTime = input.runningTime()
        sendEmergency("E" + STATION_ID)
    }
})

basic.forever(function () {
    let temperature = input.temperature()
    let gasAnalog = pins.analogReadPin(AnalogPin.P1)
    let fireRaw = pins.digitalReadPin(DigitalPin.P3)

    // 화염 센서는 LOW(0)일 때 감지되는 설정입니다.
    let fireActive = fireRaw == 0 ? 1 : 0
    // 가스 아날로그 값이 기준값을 넘으면 감지 상태를 1로 기록합니다.
    let gasActive = gasAnalog >= GAS_DANGER ? 1 : 0

    // Python이 관제 화면의 관측소 센서 상태를 갱신합니다.
    serial.writeLine(
        "OBS," + STATION_ID +
        "," + fireActive +
        "," + gasAnalog +
        "," + gasActive
    )

    let currentSignal = ""
    if (fireActive == 1) {
        currentSignal = "F" + STATION_ID
    } else if (gasActive == 1) {
        currentSignal = "G" + STATION_ID
    } else if (temperature > 30) {
        currentSignal = "H" + STATION_ID
    }

    // 센서 상태가 바뀔 때만 라디오 알림을 보냅니다.
    if (currentSignal != lastSensorSignal) {
        if (currentSignal != "") {
            radio.sendString(currentSignal)
            basic.showString(currentSignal)

            // Python은 OBS로 화재/가스를 판정하므로,
            // OBS에 없는 무더위는 별도 재난 신호로 PC에 보냅니다.
            if (currentSignal.charAt(0) == "H") {
                serial.writeLine("EMERGENCY:" + currentSignal)
            }
        } else if (lastSensorSignal != "") {
            radio.sendString("OK" + STATION_ID)
            basic.showIcon(IconNames.Yes)
        }
        lastSensorSignal = currentSignal
    }

    basic.pause(500)
})
