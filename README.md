# Vertical Slider Cover Card by konnected.vn (https://konnected.vn - VI)


[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

![Project Maintenance][maintenance-shield]

## SCREENTSHOT

Panel View screenshot

![panel card screenshot](https://github.com/konnectedvn/lovelace-vertical-slider-cover-card/blob/master/src/konnected_vn_Vertical-Slider-Cover-Card-Panel-Mode-7-2-2020.png?raw=true "Desktop screenshot")

Card screenshot

![card screenshot](https://github.com/konnectedvn/lovelace-vertical-slider-cover-card/blob/master/src/konnected_vn_Vertical-Slider-Cover-Card-Normal-Mode-7-2-2020.png?raw=true "Desktop screenshot")


Color Guideline

![card screenshot](https://github.com/konnectedvn/lovelace-vertical-slider-cover-card/blob/master/src/konnected_vn_vertical-slider-cover-card-color-guideline.png?raw=true "Desktop screenshot")


Color Picker Helper

![card screenshot](https://github.com/konnectedvn/lovelace-vertical-slider-cover-card/blob/master/src/konnected_vn_color_picker.png?raw=true "Desktop screenshot")


# Options

| Name              | Type    | Requirement  | Description                                 | Default                  |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------------ |
| type              | string  | **Required** | `custom:vertical-slider-cover-card`         |                          |
| title             | string  | **Required** | Title                                       | `VerticalSliderCoverCard`|
| entities          | list    | **Required** | Cover entities to show as slider in card    |                          |
| icon              | string  | **Optional** | Icon to show on side bar                    | ``                       |
| positionHeight    | string  | **Optional** | Height of each slider in px                 | `300px`                  |
| positionWidth     | string  | **Optional** | Width of each slider in px                  | `100px`                  |
| switchHeight      | string  | **Optional** | Height of Stop button at bottom             | `100px`                  |
| switchWidth       | string  | **Optional** | Width of Stop button at bottom              | `100px`                  |
| gapWidth          | string  | **Optional** | Width of Space between 2 cover slider       | `50px`                   |
| showButton        | string  | **Optional** | Show Home button at bottom of side bar      | `hide`                   |
| buttonPath        | string  | **Optional** | Path of Lovelace View when click button     | `/lovelace/0`            |
| buttonText        | string  | **Optional** | Text to show on button                      | `Home`                   |
| countText         | string  | **Optional** | Text to show follow number of covers open   | `covers open`            |
| background        | string  | **Optional** | Background in hex (# or hsl with opacity)   | `transparent`            |
| sideColor1        | string  | **Optional** | Upper-left color of sidebar (~)             | `#b30000`                |
| sideColor2        | string  | **Optional** | Lower-right color of sidebar (~)            | `#ffcccc`                |
| openColor         | string  | **Optional** | Color of lower slider bar (~)               | `hsl(0, 0%, 90%, 0.8)`   |
| closedColor       | string  | **Optional** | Color of upper slider bar (~)               | `hsl(0, 0%, 20%)`        |
| switchColor       | string  | **Optional** | background color of Stop button (~)         | `sideColor2`             |

## STARTING A NEW CARD FROM vertical-silder-cover-card

### INSTALL USING HACS (recommended)

Add this repo to HACS custom repositories.

**repo**: https://github.com/konnectedvn/lovelace-vertical-slider-cover-card

*Category*: Lovelace

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

In Lovelace, add new Manual card. Copy sample configuration to replace new card content, adjust entities to fix your Hass.

In View option, check Panel mode if you want do display card in full width.

#example configuration
```
type: 'custom:vertical-slider-cover-card'
background: 'rgb(0, 0, 0, 0.4)'
buttonPath: /lovelace/0
buttonText: Home
countText: 'covers open'
icon: 'mdi:blinds'
panelType: true
positionHeight: 300px
positionWidth: 100px
showButton: show
switchHeight: 80px
switchWidth: 100px
sideColor1: '#b30000'
sideColor2: '#ffcccc'
openColor: 'hsl(0, 0%, 20%, 0.8)'
closedColor: 'hsl(0, 0%, 90%)'
title: Covers
entities:
  - entity: cover.office_left_blinds
    name: Left Blinds
  - entity: cover.office_right_blinds
    name: Right Blinds
  - entity: cover.basement_shutter
    name: Basement Shutter
```
### LAST STEP

Style it using card-mod?

## ISSUE AND SUGGESTION?

Customize to suit your needs and contribute it back to the community.

Found issue? Please raise an issue in this repository or send me email to <duytruong@konnected.vn>

And suggestion and comment are warmly welcome and appreciated!

### MIGHT NOT WORK ON FIREFOX

Have some issues of displaying on firefox. Please try with caution!

## MORE WORKS TO DO

1. Remove hard-coded style

2. Support input_number and lights entities in Home Assistant

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
