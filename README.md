# Vertical Slider Cover Card by konnected.vn (https://konnected.vn -VI)

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)

![Project Maintenance][maintenance-shield]

## SCREENSHOTS

Panel View screenshot

![panel card screenshot](https://github.com/konnectedvn/lovelace-vertical-slider-cover-card/blob/master/src/konnected_vn_Vertical-Slider-Cover-Card-Panel-Mode-7-2-2020.png?raw=true "Desktop screenshot")

Card screenshot

![card screenshot](https://github.com/konnectedvn/lovelace-vertical-slider-cover-card/blob/master/src/konnected_vn_Vertical-Slider-Cover-Card-Normal-Mode-7-2-2020.png?raw=true "Desktop screenshot")


Color Guidelines

![card screenshot](https://github.com/konnectedvn/lovelace-vertical-slider-cover-card/blob/master/src/konnected_vn_vertical-slider-cover-card-color-guideline.png?raw=true "Desktop screenshot")


Color Picker Helper (Google)

![card screenshot](https://github.com/konnectedvn/lovelace-vertical-slider-cover-card/blob/master/src/konnected_vn_color_picker.png?raw=true "Desktop screenshot")

## MINIMUM REQUIREMENTS


Your covers have to support `close_cover`, `open_cover` and `set_cover_position` services.
Normally, this means `attributes.supported_features` is at least 7 or greater.


# Options

| Name                           | Type    | Requirement  | Description                                            | Default                |
| ------------------------------ | ------- | ------------ | ------------------------------------------------------ | ---------------------- |
| type                           | string  | **Required** | `custom:vertical-slider-cover-card`                    |                        |
| title                          | string  | **Required** | Title                                                  |                        |
| entities                       | list    | **Required** | Cover entities to show as slider in card               |                        |
| &nbsp;&nbsp;- entity           | string  | **Required** | Cover's `entity_id`                                    | &nbsp;                 |
| &nbsp;&nbsp;&nbsp;&nbsp;name   | string  | **Optional** | Custom name for every cover                            | `friendly_name`        |
| &nbsp;&nbsp;&nbsp;&nbsp;script | string  | **Optional** | Call additional script on every position change (3)    | `null`                 |
| **Sidebar** area               |         |              |                                                        |                        |
| showSidebar                    | boolean | **Optional** | Show or hide side bar (1)                              | `true`                 |
| sideColor1                     | string  | **Optional** | Upper-left color of sidebar (~)                        | `#ffcccc`              |
| sideColor2                     | string  | **Optional** | Lower-right color of sidebar (~)                       | `#b30000`              |
| icon                           | string  | **Optional** | Icon to show on side bar                               | `mdi:blinds`           |
| iconSize                       | string  | **Optional** | Font size of icon on side bar                          | `28px`                 |
| iconColor                      | string  | **Optional** | Color of icon on side bar                              | theme                  |
| titleSize                      | string  | **Optional** | Font size of title                                     | `40px`                 |
| titleFontColor                 | string  | **Optional** | Font color of title                                    | theme                  |
| countText                      | string  | **Optional** | Text to show follow number of covers open              | `covers open`          |
| countTextFontColor             | string  | **Optional** | Font color of text to show follow number               | theme                  |
| showButton                     | boolean | **Optional** | Show Home button at bottom of side bar                 | `false`                |
| closedBaseline                 | byte    | **Optional** | Cover with positon higher is counted as open           | `0`                |
| buttonText                     | string  | **Optional** | Text to show on button                                 | `Home`                 |
| buttonFontColor                | string  | **Optional** | Font color of button                                   | theme                  |
| buttonPath                     | string  | **Optional** | Path of Lovelace View when click button                | `/lovelace/0`          |
| buttonService                  | string  | **Optional** | Service to call (overide buttonPath if any)            | `null`                 |
| buttonData                     | string  | **Optional** | Service data to call                                   | `null`                 |
| **Cover** area                 |         |              |                                                        |                        |
| background                     | string  | **Optional** | Card background in hex (# or hsl with opacity)         | `transparent`          |
| panelType                      | boolean | **Optional** | Try to center all sliders (`gapWidth` will be ignored) | `true`                 |
| gapWidth                       | string  | **Optional** | Width of Space between 2 cover sliders                 | `50px`                 |
| positionHeight                 | string  | **Optional** | Height of each slider in px                            | `300px`                |
| positionWidth                  | string  | **Optional** | Width of each slider in px                             | `100px`                |
| openColor                      | string  | **Optional** | Color of lower slider bar (~)                          | `hsl(0, 0%, 90%, 0.8)` |
| closedColor                    | string  | **Optional** | Color of upper slider bar (~)                          | `hsl(0, 0%, 20%)`      |
| openBaseline                   | integer | **Optional** | (2)                                                    | `0`                    |
| showSwitch                     | boolean | **Optional** | Show STOP switch under every covers                    | `true`                 |
| switchWidth                    | string  | **Optional** | Width of Stop button at bottom                         | `positionWidth`        |
| switchHeight                   | string  | **Optional** | Height of Stop button at bottom                        | `switchWidth`          |
| switchColor                    | string  | **Optional** | Background color of Stop button (~)                    | `sideColor2`           |
| switchFontColor                | string  | **Optional** | Font color of Stop button at bottom                    | theme                  |
| showName                       | boolean | **Optional** | Show/hide the name of cover                            | `true`                 |
| showPosition                   | boolean | **Optional** | Show/hide the position (number) of cover               | `true`                 |

## STARTING A NEW CARD

### INSTALL USING HACS (recommended)

<del>Add this repo to HACS custom repositories.</del>
Card is in HACS default.

**repo**: https://github.com/konnectedvn/lovelace-vertical-slider-cover-card

*Category*: Frontend

Hướng dẫn cài đặt và sử dụng HACS trong Home Assistant có thể xem ở đây (VI - HACS Guide):
https://konnected.vn/home-assistant/home-assistant-cai-dat-hacs-va-theme-2020-03-27

### MANUAL INSTALL

Download vertical-slider-cover-card.js and add it to your /config/wwww/vertical-slider-cover-card (make new dir if it does not exist).

In Home Assistant Dashboard **Resource**, add resource path /local/vertical-slider-cover-card/vertical-slider-cover-card.js, type: module.

`resources`:
```yaml
- url: /local/vertical-slider-cover-card/vertical-slider-cover-card.js
  type: module
```

### ADD NEW CARD

In Lovelace, add new Manual card. Replace new card content with sample configuration below. Change the entities.

In View option, check Panel mode if you want do display card in full width.

#example configuration

##minimum configuration

```yaml
type: 'custom:vertical-slider-cover-card'
title: Garage
entities:
- entity: cover.garage_shutter
```

##more customized

```yaml
type: 'custom:vertical-slider-cover-card'
background: 'rgba(0, 0, 0, 0.4)'
showButton: true
buttonPath: /lovelace/0
buttonText: Home
#Call service instead of navigating -> comment 1 line above & uncomment all belows
#buttonText: CLOSE
#buttonService: cover.close_cover
#buttonData: 'cover.office_left_blinds,cover.office_right_blinds,cover.basement_shutter'
countText: 'covers open'
closedBaseline: 5
icon: 'mdi:blinds'
iconSize: 40px
panelType: true
showSidebar: true
positionHeight: 300px
positionWidth: 100px
gapWidth: 50px
switchHeight: 80px
switchWidth: 100px
showSwitch: true
sideColor1: '#ffcccc'
sideColor2: '#b30000'
openColor: 'hsl(0, 0%, 20%, 0.8)'
closedColor: 'hsl(0, 0%, 90%)'
title: Covers
titleSize: 40px
entities:
  - entity: cover.office_left_blinds
    name: Left Blinds
  - entity: cover.office_right_blinds
    name: Right Blinds
  - entity: cover.basement_shutter
    name: Basement Shutter
    script: script.disable_alarm_for_5_min
```

**(1)** You might want to hide side bar (showSidebar: false) to have 2 or 3 covers in same card on mobile.

**(2)** openBaseline - some covers stop at position 2 or 1 instead of 0. When set, any cover with current_position
greater than *openBaseline* will be counted as open.

**(3)** when declared, script will be called *simutaneously* with `cover.set_position` service (which is used to set cover to desired position). You might want to use this script option to, for example, temporarily disable mid-night open door alarm.

Example of script:

```yaml
disable_alarm_for_5_min:
  alias: Disarm alarm panel for 5 mins
  mode: single
  sequence: #Home Assistant >= 0.113
  #try to save current state of alarm_panel
  - service: scene.create
    data:
      scene_id: door_alarm_panel_state
      snapshot_entities:
      - alarm_control_panel.door_alarm
  - data: {}
    entity_id: alarm_control_panel.door_alarm
    service: alarm_control_panel.alarm_disarm
  - delay: '00:05:00'
  #set it back
  - scene: scene.door_alarm_panel_state
  icon: mdi:alarm-note-off
```



## ISSUE AND SUGGESTION?

Customize to suit your needs and contribute it back to the community.

Found issue? Please raise an issue in this repository or send me email to <duytruong@konnected.vn>

Any suggestion and comment are warmly welcome and appreciated!

### MIGHT NOT WORK ON FIREFOX

Have some appearance issues on Firefox. Please try with caution!

## MORE WORKS TO DO

1. Change hard-coded styles and clean codes (done somehow)

2. Remove unnecessary css and js blocks

3. Support input_number and light entities in Home Assistant

### Many Thanks to DBuit!

This card is based on his lights-card at: https://github.com/DBuit/hass-smart-home-panel-card.

## Support (just for fun!)

Hey dude! Help me out for a couple of :beers: or a :coffee: (:coffee: is preferred, have enough beers this year)!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/wolverinevn)

[maintenance-shield]: https://img.shields.io/maintenance/yes/2020.svg?style=for-the-badge
[twitter]: https://twitter.com/KonnectedVN
[site]: https://konnected.vn/home-assistant
[license-shield]: https://img.shields.io/github/license/konnectedvn/lovelace-vertical-slider-cover-card.svg?style=for-the-badge&color=red
[maintenance-shield]: https://img.shields.io/maintenance/yes/2020.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/v/release/konnectedvn/lovelace-vertical-slider-cover-card.svg?style=for-the-badge&color=red
[releases]: https://github.com/konnectedvn/lovelace-vertical-slider-cover-card/releases
