/*
 * Copyright 2020 Marek Kobida
 */

module.exports = $ => {
  $.cache(true);

  const plugins = ['@babel/plugin-proposal-class-properties'];

  const presets = ['@babel/preset-react', '@babel/preset-typescript'];

  return { plugins, presets };
};
