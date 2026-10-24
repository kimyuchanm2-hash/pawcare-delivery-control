PawCare 배송 관제 · RoboDog + micro:bit 관측소

최종 연동 코드
- robodog_abc_delivery.py : Thonny에서 실행하는 Python 제어 프로그램입니다. 배송, 인물·QR 확인, 재난 정지, 관제 HTML 서버를 처리합니다.
- microbit_disaster_station_sender_makecode.ts : 관측소 센서 송신 micro:bit MakeCode JavaScript입니다.
- microbit_robodog_radio_receiver_makecode.ts : RoboDog에 장착하는 라디오 수신 micro:bit MakeCode JavaScript입니다.

장치 연결
- 관측소 송신 micro:bit: PC USB COM17, 115200 baud. 센서값 OBS 패킷과 E/H 재난 신호를 Python에 보냅니다.
- RoboDog 장착 수신 micro:bit: RoboDog에서 전원 공급. PC USB/COM 포트에는 연결하지 않습니다.
- RoboDog: PC USB COM8.
- 두 micro:bit의 라디오 그룹은 1입니다.
- 포트가 다르면 Python 상단의 ROBODOG_PORT 또는 MICROBIT_PORT 환경 설정을 확인합니다.

신호
- E=흔들림 지진, F=화재, G=가스 유출, H=무더위.
- 번호 1은 A·B, 2는 B·C 영향 위치입니다. 현재 관측소 코드는 번호 1로 설정되어 있습니다.
- 관측소는 500ms마다 OBS,1,화재감지,가스아날로그,가스감지 값을 COM17로 보냅니다.
- 화재·가스는 OBS 센서값으로 Python이 감지하고, 흔들림·무더위는 EMERGENCY:E1/H1 메시지로 전달합니다.
- 재난 신호는 라디오로 RoboDog 장착 micro:bit에도 표시합니다.

실행 순서
1. MakeCode에서 송신 코드를 관측소 micro:bit에, 수신 코드를 RoboDog 장착 micro:bit에 다운로드합니다.
2. RoboDog를 COM8로, 관측소 micro:bit를 COM17로 PC에 연결합니다.
3. Thonny에서 robodog_abc_delivery.py를 실행합니다.
4. 브라우저에서 http://127.0.0.1:8765/ 를 엽니다.
5. 시험은 로보독 다리를 바닥에서 띄우거나 안전한 낮은 속도로 진행하고 센서 임계값을 확인합니다.

GitHub Pages는 화면을 보여주는 정적 페이지입니다. 실제 COM 통신과 로봇 제어에는 PC에서 Python 프로그램이 실행 중이어야 합니다. 코드를 올린 것과 로보독 실기기에서 정상 작동을 확인한 것은 별개이므로 실제 장비에서 다시 시험하세요.
