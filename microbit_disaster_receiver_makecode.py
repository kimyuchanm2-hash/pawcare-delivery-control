# MakeCode Python: 재난 신호 수신 게이트웨이 micro:bit
# 라디오 그룹 1 신호를 받아 USB 시리얼로 PC Python 관제에 전달합니다.
# 송신 신호 예: E1, F2, G1, H2

serial.redirect_to_usb()
radio.set_group(1)


def on_received_string(received_string):
    global message
    message = received_string.strip().upper()
    if len(message) != 2:
        basic.show_string("?")
        return

    disaster_code = message[0]
    location_code = message[1]
    if (disaster_code != "E" and disaster_code != "F" and
            disaster_code != "G" and disaster_code != "H"):
        basic.show_string("?")
        return
    if location_code != "1" and location_code != "2":
        basic.show_string("?")
        return

    # 수신 micro:bit → USB Serial → PC Python으로 한 방향 중계합니다.
    serial.write_line("EMERGENCY:" + message)
    basic.show_string(message)


message = ""
radio.on_received_string(on_received_string)


def on_forever():
    basic.pause(100)


basic.forever(on_forever)
