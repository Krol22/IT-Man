const constants = {
  PLAYER_AX: 0.8,
  PLAYER_AY: 0.8,
  FRICTION: 0.85,
  SCALE_X: 4,
  SCALE_Y: 4,
  colors: [
    '#50351d',
    '#ffeede',
    '#5f5f5f',
    '#dadada',
    '#afafaf',
    '#e1ffde',
    '#224064',
    '#000000',
  ],
  playerFrames: [
    [
      ['', '', '', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '', '', ''],
      ['', '', '', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, '', '', ''],
      ['', '', '', 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, ''],
      ['', '', '', 2, 2, 2, 3, 4, 4, 3, 2, 3, 4, 5, 3, ''],
      ['', '', '', 2, 2, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, ''],
      ['', '', '', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, '', '', ''],
      ['', '', '', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, '', '', ''],
      ['', '', 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, '', ''],
      ['', '', 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, '', ''],
      ['', '', 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, '', ''],
      ['', '', 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, '', ''],
      ['', '', 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, '', ''],
      ['', '', '', 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, '', '', ''],
      ['', '', '', 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, '', '', ''],
      ['', '', '', '', '', 8, '', '', '', '', 8, '', '', '', '', ''],
      ['', '', '', '', '', 8, '', '', '', '', 8, '', '', '', '', ''],
    ],
    [
      ['', '', '', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '', '', ''],
      ['', '', '', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, '', '', ''],
      ['', '', '', 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, ''],
      ['', '', '', 2, 2, 2, 3, 4, 4, 3, 2, 3, 4, 5, 3, ''],
      ['', '', '', 2, 2, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, ''],
      ['', '', '', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, '', '', ''],
      ['', '', '', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, '', '', ''],
      ['', '', 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, '', ''],
      ['', '', 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, '', ''],
      ['', '', 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, '', ''],
      ['', '', 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, '', ''],
      ['', '', 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, '', ''],
      ['', '', '', 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, '', '', ''],
      ['', '', '', 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, '', '', ''],
      ['', '', '', '', '', 8, '', '', '', '', 8, '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', 8, '', '', '', '', ''],

    ],
    [
      ['', '', '', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '', '', ''],
      ['', '', '', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, '', '', ''],
      ['', '', '', 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, ''],
      ['', '', '', 2, 2, 2, 3, 4, 4, 3, 2, 3, 4, 5, 3, ''],
      ['', '', '', 2, 2, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, ''],
      ['', '', '', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, '', '', ''],
      ['', '', '', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, '', '', ''],
      ['', '', 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, '', ''],
      ['', '', 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, '', ''],
      ['', '', 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, '', ''],
      ['', '', 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, '', ''],
      ['', '', 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, '', ''],
      ['', '', '', 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, '', '', ''],
      ['', '', '', 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, '', '', ''],
      ['', '', '', '', '', 8, '', '', '', '', 8, '', '', '', '', ''],
      ['', '', '', '', '', 8, '', '', '', '', '', '', '', '', '', ''],
    ],
  ],
};

module.exports = constants;
