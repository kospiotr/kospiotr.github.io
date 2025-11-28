---
title: EspHome
---

# Esp32 128 pins debug inputs
```
esphome:
  name: controller01
esp32:
  board: nodemcu-32s
  framework:
    type: esp-idf
wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: controller01 hotspot
    password: !secret wifi_password
  power_save_mode: none
  use_address: controller01.home
captive_portal: {}
logger:
  baud_rate: 0
  level: INFO
api:
  encryption:
    key: !secret api_encryption_key
ota:
  - platform: esphome
    password: !secret ota_password
i2c:
  scan: true
mcp23017:
  - id: mcp23017_hub_0
    address: "0x20"
  - id: mcp23017_hub_1
    address: "0x21"
  - id: mcp23017_hub_2
    address: "0x22"
  - id: mcp23017_hub_3
    address: "0x23"
  - id: mcp23017_hub_4
    address: "0x24"
  - id: mcp23017_hub_5
    address: "0x25"
  - id: mcp23017_hub_6
    address: "0x26"
  - id: mcp23017_hub_7
    address: "0x27"
binary_sensor:
  - platform: gpio
    id: IN_0_mcp23017_hub_0_0
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 0
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_1_mcp23017_hub_0_1
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 1
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_2_mcp23017_hub_0_2
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 2
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_3_mcp23017_hub_0_3
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 3
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_4_mcp23017_hub_0_4
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 4
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_5_mcp23017_hub_0_5
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 5
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_6_mcp23017_hub_0_6
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 6
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_7_mcp23017_hub_0_7
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 7
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_8_mcp23017_hub_0_8
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 8
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_9_mcp23017_hub_0_9
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 9
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_10_mcp23017_hub_0_10
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 10
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_11_mcp23017_hub_0_11
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 11
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_12_mcp23017_hub_0_12
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 12
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_13_mcp23017_hub_0_13
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 13
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_14_mcp23017_hub_0_14
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 14
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_15_mcp23017_hub_0_15
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 15
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_16_mcp23017_hub_1_0
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 0
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_17_mcp23017_hub_1_1
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 1
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_18_mcp23017_hub_1_2
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 2
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_19_mcp23017_hub_1_3
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 3
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_20_mcp23017_hub_1_4
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 4
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_21_mcp23017_hub_1_5
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 5
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_22_mcp23017_hub_1_6
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 6
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_23_mcp23017_hub_1_7
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 7
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_24_mcp23017_hub_1_8
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 8
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_25_mcp23017_hub_1_9
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 9
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_26_mcp23017_hub_1_10
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 10
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_27_mcp23017_hub_1_11
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 11
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_28_mcp23017_hub_1_12
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 12
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_29_mcp23017_hub_1_13
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 13
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_30_mcp23017_hub_1_14
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 14
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_31_mcp23017_hub_1_15
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 15
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_32_mcp23017_hub_2_0
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 0
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_33_mcp23017_hub_2_1
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 1
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_34_mcp23017_hub_2_2
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 2
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_35_mcp23017_hub_2_3
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 3
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_36_mcp23017_hub_2_4
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 4
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_37_mcp23017_hub_2_5
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 5
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_38_mcp23017_hub_2_6
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 6
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_39_mcp23017_hub_2_7
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 7
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_40_mcp23017_hub_2_8
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 8
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_41_mcp23017_hub_2_9
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 9
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_42_mcp23017_hub_2_10
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 10
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_43_mcp23017_hub_2_11
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 11
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_44_mcp23017_hub_2_12
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 12
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_45_mcp23017_hub_2_13
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 13
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_46_mcp23017_hub_2_14
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 14
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_47_mcp23017_hub_2_15
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 15
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_48_mcp23017_hub_3_0
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 0
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_49_mcp23017_hub_3_1
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 1
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_50_mcp23017_hub_3_2
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 2
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_51_mcp23017_hub_3_3
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 3
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_52_mcp23017_hub_3_4
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 4
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_53_mcp23017_hub_3_5
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 5
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_54_mcp23017_hub_3_6
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 6
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_55_mcp23017_hub_3_7
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 7
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_56_mcp23017_hub_3_8
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 8
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_57_mcp23017_hub_3_9
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 9
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_58_mcp23017_hub_3_10
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 10
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_59_mcp23017_hub_3_11
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 11
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_60_mcp23017_hub_3_12
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 12
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_61_mcp23017_hub_3_13
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 13
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_62_mcp23017_hub_3_14
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 14
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_63_mcp23017_hub_3_15
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 15
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_64_mcp23017_hub_4_0
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 0
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_65_mcp23017_hub_4_1
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 1
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_66_mcp23017_hub_4_2
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 2
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_67_mcp23017_hub_4_3
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 3
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_68_mcp23017_hub_4_4
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 4
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_69_mcp23017_hub_4_5
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 5
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_70_mcp23017_hub_4_6
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 6
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_71_mcp23017_hub_4_7
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 7
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_72_mcp23017_hub_4_8
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 8
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_73_mcp23017_hub_4_9
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 9
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_74_mcp23017_hub_4_10
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 10
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_75_mcp23017_hub_4_11
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 11
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_76_mcp23017_hub_4_12
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 12
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_77_mcp23017_hub_4_13
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 13
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_78_mcp23017_hub_4_14
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 14
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_79_mcp23017_hub_4_15
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 15
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_80_mcp23017_hub_5_0
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 0
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_81_mcp23017_hub_5_1
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 1
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_82_mcp23017_hub_5_2
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 2
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_83_mcp23017_hub_5_3
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 3
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_84_mcp23017_hub_5_4
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 4
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_85_mcp23017_hub_5_5
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 5
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_86_mcp23017_hub_5_6
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 6
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_87_mcp23017_hub_5_7
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 7
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_88_mcp23017_hub_5_8
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 8
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_89_mcp23017_hub_5_9
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 9
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_90_mcp23017_hub_5_10
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 10
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_91_mcp23017_hub_5_11
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 11
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_92_mcp23017_hub_5_12
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 12
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_93_mcp23017_hub_5_13
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 13
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_94_mcp23017_hub_5_14
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 14
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_95_mcp23017_hub_5_15
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 15
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_96_mcp23017_hub_6_0
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 0
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_97_mcp23017_hub_6_1
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 1
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_98_mcp23017_hub_6_2
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 2
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_99_mcp23017_hub_6_3
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 3
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_100_mcp23017_hub_6_4
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 4
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_101_mcp23017_hub_6_5
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 5
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_102_mcp23017_hub_6_6
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 6
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_103_mcp23017_hub_6_7
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 7
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_104_mcp23017_hub_6_8
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 8
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_105_mcp23017_hub_6_9
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 9
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_106_mcp23017_hub_6_10
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 10
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_107_mcp23017_hub_6_11
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 11
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_108_mcp23017_hub_6_12
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 12
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_109_mcp23017_hub_6_13
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 13
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_110_mcp23017_hub_6_14
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 14
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_111_mcp23017_hub_6_15
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 15
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_112_mcp23017_hub_7_0
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 0
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_113_mcp23017_hub_7_1
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 1
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_114_mcp23017_hub_7_2
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 2
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_115_mcp23017_hub_7_3
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 3
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_116_mcp23017_hub_7_4
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 4
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_117_mcp23017_hub_7_5
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 5
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_118_mcp23017_hub_7_6
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 6
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_119_mcp23017_hub_7_7
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 7
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_120_mcp23017_hub_7_8
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 8
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_121_mcp23017_hub_7_9
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 9
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_122_mcp23017_hub_7_10
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 10
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_123_mcp23017_hub_7_11
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 11
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_124_mcp23017_hub_7_12
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 12
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_125_mcp23017_hub_7_13
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 13
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_126_mcp23017_hub_7_14
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 14
      mode: INPUT_PULLUP
  - platform: gpio
    id: IN_127_mcp23017_hub_7_15
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 15
      mode: INPUT_PULLUP

```

# Esp32 128 pins debug outputs
```
esphome:
  name: controller01
esp32:
  board: nodemcu-32s
  framework:
    type: esp-idf
wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: controller01 hotspot
    password: !secret wifi_password
  power_save_mode: none
  use_address: controller01.home
captive_portal: {}
logger:
  baud_rate: 0
  level: INFO
api:
  encryption:
    key: !secret api_encryption_key
ota:
  - platform: esphome
    password: !secret ota_password
i2c:
  scan: true
mcp23017:
  - id: mcp23017_hub_0
    address: "0x20"
  - id: mcp23017_hub_1
    address: "0x21"
  - id: mcp23017_hub_2
    address: "0x22"
  - id: mcp23017_hub_3
    address: "0x23"
  - id: mcp23017_hub_4
    address: "0x24"
  - id: mcp23017_hub_5
    address: "0x25"
  - id: mcp23017_hub_6
    address: "0x26"
  - id: mcp23017_hub_7
    address: "0x27"
switch:
  - platform: gpio
    id: OUT_0_mcp23017_hub_0_0
    name: OUT_0_mcp23017_hub_0_0
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 0
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_1_mcp23017_hub_0_1
    name: OUT_1_mcp23017_hub_0_1
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 1
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_2_mcp23017_hub_0_2
    name: OUT_2_mcp23017_hub_0_2
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 2
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_3_mcp23017_hub_0_3
    name: OUT_3_mcp23017_hub_0_3
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 3
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_4_mcp23017_hub_0_4
    name: OUT_4_mcp23017_hub_0_4
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 4
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_5_mcp23017_hub_0_5
    name: OUT_5_mcp23017_hub_0_5
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 5
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_6_mcp23017_hub_0_6
    name: OUT_6_mcp23017_hub_0_6
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 6
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_7_mcp23017_hub_0_7
    name: OUT_7_mcp23017_hub_0_7
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 7
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_8_mcp23017_hub_0_8
    name: OUT_8_mcp23017_hub_0_8
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 8
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_9_mcp23017_hub_0_9
    name: OUT_9_mcp23017_hub_0_9
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 9
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_10_mcp23017_hub_0_10
    name: OUT_10_mcp23017_hub_0_10
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 10
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_11_mcp23017_hub_0_11
    name: OUT_11_mcp23017_hub_0_11
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 11
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_12_mcp23017_hub_0_12
    name: OUT_12_mcp23017_hub_0_12
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 12
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_13_mcp23017_hub_0_13
    name: OUT_13_mcp23017_hub_0_13
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 13
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_14_mcp23017_hub_0_14
    name: OUT_14_mcp23017_hub_0_14
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 14
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_15_mcp23017_hub_0_15
    name: OUT_15_mcp23017_hub_0_15
    pin:
      mcp23xxx: mcp23017_hub_0
      number: 15
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_16_mcp23017_hub_1_0
    name: OUT_16_mcp23017_hub_1_0
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 0
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_17_mcp23017_hub_1_1
    name: OUT_17_mcp23017_hub_1_1
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 1
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_18_mcp23017_hub_1_2
    name: OUT_18_mcp23017_hub_1_2
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 2
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_19_mcp23017_hub_1_3
    name: OUT_19_mcp23017_hub_1_3
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 3
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_20_mcp23017_hub_1_4
    name: OUT_20_mcp23017_hub_1_4
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 4
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_21_mcp23017_hub_1_5
    name: OUT_21_mcp23017_hub_1_5
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 5
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_22_mcp23017_hub_1_6
    name: OUT_22_mcp23017_hub_1_6
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 6
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_23_mcp23017_hub_1_7
    name: OUT_23_mcp23017_hub_1_7
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 7
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_24_mcp23017_hub_1_8
    name: OUT_24_mcp23017_hub_1_8
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 8
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_25_mcp23017_hub_1_9
    name: OUT_25_mcp23017_hub_1_9
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 9
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_26_mcp23017_hub_1_10
    name: OUT_26_mcp23017_hub_1_10
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 10
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_27_mcp23017_hub_1_11
    name: OUT_27_mcp23017_hub_1_11
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 11
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_28_mcp23017_hub_1_12
    name: OUT_28_mcp23017_hub_1_12
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 12
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_29_mcp23017_hub_1_13
    name: OUT_29_mcp23017_hub_1_13
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 13
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_30_mcp23017_hub_1_14
    name: OUT_30_mcp23017_hub_1_14
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 14
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_31_mcp23017_hub_1_15
    name: OUT_31_mcp23017_hub_1_15
    pin:
      mcp23xxx: mcp23017_hub_1
      number: 15
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_32_mcp23017_hub_2_0
    name: OUT_32_mcp23017_hub_2_0
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 0
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_33_mcp23017_hub_2_1
    name: OUT_33_mcp23017_hub_2_1
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 1
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_34_mcp23017_hub_2_2
    name: OUT_34_mcp23017_hub_2_2
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 2
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_35_mcp23017_hub_2_3
    name: OUT_35_mcp23017_hub_2_3
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 3
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_36_mcp23017_hub_2_4
    name: OUT_36_mcp23017_hub_2_4
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 4
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_37_mcp23017_hub_2_5
    name: OUT_37_mcp23017_hub_2_5
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 5
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_38_mcp23017_hub_2_6
    name: OUT_38_mcp23017_hub_2_6
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 6
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_39_mcp23017_hub_2_7
    name: OUT_39_mcp23017_hub_2_7
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 7
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_40_mcp23017_hub_2_8
    name: OUT_40_mcp23017_hub_2_8
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 8
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_41_mcp23017_hub_2_9
    name: OUT_41_mcp23017_hub_2_9
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 9
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_42_mcp23017_hub_2_10
    name: OUT_42_mcp23017_hub_2_10
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 10
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_43_mcp23017_hub_2_11
    name: OUT_43_mcp23017_hub_2_11
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 11
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_44_mcp23017_hub_2_12
    name: OUT_44_mcp23017_hub_2_12
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 12
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_45_mcp23017_hub_2_13
    name: OUT_45_mcp23017_hub_2_13
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 13
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_46_mcp23017_hub_2_14
    name: OUT_46_mcp23017_hub_2_14
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 14
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_47_mcp23017_hub_2_15
    name: OUT_47_mcp23017_hub_2_15
    pin:
      mcp23xxx: mcp23017_hub_2
      number: 15
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_48_mcp23017_hub_3_0
    name: OUT_48_mcp23017_hub_3_0
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 0
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_49_mcp23017_hub_3_1
    name: OUT_49_mcp23017_hub_3_1
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 1
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_50_mcp23017_hub_3_2
    name: OUT_50_mcp23017_hub_3_2
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 2
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_51_mcp23017_hub_3_3
    name: OUT_51_mcp23017_hub_3_3
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 3
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_52_mcp23017_hub_3_4
    name: OUT_52_mcp23017_hub_3_4
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 4
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_53_mcp23017_hub_3_5
    name: OUT_53_mcp23017_hub_3_5
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 5
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_54_mcp23017_hub_3_6
    name: OUT_54_mcp23017_hub_3_6
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 6
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_55_mcp23017_hub_3_7
    name: OUT_55_mcp23017_hub_3_7
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 7
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_56_mcp23017_hub_3_8
    name: OUT_56_mcp23017_hub_3_8
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 8
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_57_mcp23017_hub_3_9
    name: OUT_57_mcp23017_hub_3_9
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 9
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_58_mcp23017_hub_3_10
    name: OUT_58_mcp23017_hub_3_10
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 10
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_59_mcp23017_hub_3_11
    name: OUT_59_mcp23017_hub_3_11
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 11
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_60_mcp23017_hub_3_12
    name: OUT_60_mcp23017_hub_3_12
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 12
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_61_mcp23017_hub_3_13
    name: OUT_61_mcp23017_hub_3_13
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 13
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_62_mcp23017_hub_3_14
    name: OUT_62_mcp23017_hub_3_14
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 14
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_63_mcp23017_hub_3_15
    name: OUT_63_mcp23017_hub_3_15
    pin:
      mcp23xxx: mcp23017_hub_3
      number: 15
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_64_mcp23017_hub_4_0
    name: OUT_64_mcp23017_hub_4_0
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 0
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_65_mcp23017_hub_4_1
    name: OUT_65_mcp23017_hub_4_1
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 1
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_66_mcp23017_hub_4_2
    name: OUT_66_mcp23017_hub_4_2
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 2
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_67_mcp23017_hub_4_3
    name: OUT_67_mcp23017_hub_4_3
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 3
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_68_mcp23017_hub_4_4
    name: OUT_68_mcp23017_hub_4_4
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 4
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_69_mcp23017_hub_4_5
    name: OUT_69_mcp23017_hub_4_5
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 5
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_70_mcp23017_hub_4_6
    name: OUT_70_mcp23017_hub_4_6
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 6
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_71_mcp23017_hub_4_7
    name: OUT_71_mcp23017_hub_4_7
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 7
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_72_mcp23017_hub_4_8
    name: OUT_72_mcp23017_hub_4_8
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 8
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_73_mcp23017_hub_4_9
    name: OUT_73_mcp23017_hub_4_9
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 9
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_74_mcp23017_hub_4_10
    name: OUT_74_mcp23017_hub_4_10
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 10
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_75_mcp23017_hub_4_11
    name: OUT_75_mcp23017_hub_4_11
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 11
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_76_mcp23017_hub_4_12
    name: OUT_76_mcp23017_hub_4_12
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 12
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_77_mcp23017_hub_4_13
    name: OUT_77_mcp23017_hub_4_13
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 13
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_78_mcp23017_hub_4_14
    name: OUT_78_mcp23017_hub_4_14
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 14
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_79_mcp23017_hub_4_15
    name: OUT_79_mcp23017_hub_4_15
    pin:
      mcp23xxx: mcp23017_hub_4
      number: 15
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_80_mcp23017_hub_5_0
    name: OUT_80_mcp23017_hub_5_0
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 0
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_81_mcp23017_hub_5_1
    name: OUT_81_mcp23017_hub_5_1
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 1
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_82_mcp23017_hub_5_2
    name: OUT_82_mcp23017_hub_5_2
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 2
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_83_mcp23017_hub_5_3
    name: OUT_83_mcp23017_hub_5_3
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 3
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_84_mcp23017_hub_5_4
    name: OUT_84_mcp23017_hub_5_4
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 4
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_85_mcp23017_hub_5_5
    name: OUT_85_mcp23017_hub_5_5
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 5
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_86_mcp23017_hub_5_6
    name: OUT_86_mcp23017_hub_5_6
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 6
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_87_mcp23017_hub_5_7
    name: OUT_87_mcp23017_hub_5_7
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 7
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_88_mcp23017_hub_5_8
    name: OUT_88_mcp23017_hub_5_8
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 8
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_89_mcp23017_hub_5_9
    name: OUT_89_mcp23017_hub_5_9
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 9
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_90_mcp23017_hub_5_10
    name: OUT_90_mcp23017_hub_5_10
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 10
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_91_mcp23017_hub_5_11
    name: OUT_91_mcp23017_hub_5_11
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 11
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_92_mcp23017_hub_5_12
    name: OUT_92_mcp23017_hub_5_12
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 12
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_93_mcp23017_hub_5_13
    name: OUT_93_mcp23017_hub_5_13
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 13
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_94_mcp23017_hub_5_14
    name: OUT_94_mcp23017_hub_5_14
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 14
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_95_mcp23017_hub_5_15
    name: OUT_95_mcp23017_hub_5_15
    pin:
      mcp23xxx: mcp23017_hub_5
      number: 15
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_96_mcp23017_hub_6_0
    name: OUT_96_mcp23017_hub_6_0
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 0
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_97_mcp23017_hub_6_1
    name: OUT_97_mcp23017_hub_6_1
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 1
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_98_mcp23017_hub_6_2
    name: OUT_98_mcp23017_hub_6_2
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 2
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_99_mcp23017_hub_6_3
    name: OUT_99_mcp23017_hub_6_3
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 3
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_100_mcp23017_hub_6_4
    name: OUT_100_mcp23017_hub_6_4
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 4
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_101_mcp23017_hub_6_5
    name: OUT_101_mcp23017_hub_6_5
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 5
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_102_mcp23017_hub_6_6
    name: OUT_102_mcp23017_hub_6_6
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 6
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_103_mcp23017_hub_6_7
    name: OUT_103_mcp23017_hub_6_7
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 7
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_104_mcp23017_hub_6_8
    name: OUT_104_mcp23017_hub_6_8
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 8
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_105_mcp23017_hub_6_9
    name: OUT_105_mcp23017_hub_6_9
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 9
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_106_mcp23017_hub_6_10
    name: OUT_106_mcp23017_hub_6_10
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 10
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_107_mcp23017_hub_6_11
    name: OUT_107_mcp23017_hub_6_11
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 11
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_108_mcp23017_hub_6_12
    name: OUT_108_mcp23017_hub_6_12
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 12
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_109_mcp23017_hub_6_13
    name: OUT_109_mcp23017_hub_6_13
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 13
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_110_mcp23017_hub_6_14
    name: OUT_110_mcp23017_hub_6_14
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 14
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_111_mcp23017_hub_6_15
    name: OUT_111_mcp23017_hub_6_15
    pin:
      mcp23xxx: mcp23017_hub_6
      number: 15
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_112_mcp23017_hub_7_0
    name: OUT_112_mcp23017_hub_7_0
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 0
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_113_mcp23017_hub_7_1
    name: OUT_113_mcp23017_hub_7_1
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 1
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_114_mcp23017_hub_7_2
    name: OUT_114_mcp23017_hub_7_2
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 2
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_115_mcp23017_hub_7_3
    name: OUT_115_mcp23017_hub_7_3
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 3
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_116_mcp23017_hub_7_4
    name: OUT_116_mcp23017_hub_7_4
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 4
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_117_mcp23017_hub_7_5
    name: OUT_117_mcp23017_hub_7_5
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 5
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_118_mcp23017_hub_7_6
    name: OUT_118_mcp23017_hub_7_6
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 6
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_119_mcp23017_hub_7_7
    name: OUT_119_mcp23017_hub_7_7
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 7
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_120_mcp23017_hub_7_8
    name: OUT_120_mcp23017_hub_7_8
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 8
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_121_mcp23017_hub_7_9
    name: OUT_121_mcp23017_hub_7_9
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 9
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_122_mcp23017_hub_7_10
    name: OUT_122_mcp23017_hub_7_10
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 10
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_123_mcp23017_hub_7_11
    name: OUT_123_mcp23017_hub_7_11
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 11
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_124_mcp23017_hub_7_12
    name: OUT_124_mcp23017_hub_7_12
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 12
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_125_mcp23017_hub_7_13
    name: OUT_125_mcp23017_hub_7_13
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 13
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_126_mcp23017_hub_7_14
    name: OUT_126_mcp23017_hub_7_14
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 14
      mode: OUTPUT
      inverted: false
  - platform: gpio
    id: OUT_127_mcp23017_hub_7_15
    name: OUT_127_mcp23017_hub_7_15
    pin:
      mcp23xxx: mcp23017_hub_7
      number: 15
      mode: OUTPUT
      inverted: false

```
