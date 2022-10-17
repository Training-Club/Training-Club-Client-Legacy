import {extendTheme} from 'native-base';
import {Dimensions} from 'react-native';

export default function () {
  const {width} = Dimensions.get('screen');
  const smallScreen = width <= 375;

  return extendTheme({
    config: {
      useSystemColorMode: true,
    },

    components: {
      Button: {
        variants: {
          info: ({colorMode}: any) => {
            return {
              bgColor:
                colorMode === 'dark' ? 'apple.blue.dark' : 'apple.blue.light',
              _pressed: {
                bgColor:
                  colorMode === 'dark' ? 'apple.blue.light' : 'apple.blue.dark',
              },
            };
          },
          basic: ({colorMode}: any) => {
            return {
              bgColor: colorMode === 'dark' ? 'white' : 'black',
              _text: {
                color: colorMode === 'dark' ? 'black' : 'white',
                fontWeight: 'semibold',
              },
            };
          },
        },
        baseStyle: ({colorMode}: any) => {
          return {
            _text: {
              color: colorMode === 'dark' ? 'white' : 'black',
              fontWeight: 'semibold',
            },
            size: 'lg',
            py: 3,
            borderRadius: '12px',
          };
        },
      },

      Text: {
        baseStyle: ({colorMode}: any) => {
          return {
            color: colorMode === 'dark' ? 'core.text.dark' : 'core.text.light',
          };
        },
      },

      Heading: {
        baseStyle: ({colorMode}: any) => {
          return {
            color: colorMode === 'dark' ? 'core.text.dark' : 'core.text.light',
          };
        },
      },

      View: {
        baseStyle: ({colorMode}: any) => {
          return {
            bgColor:
              colorMode === 'dark'
                ? 'core.background.dark'
                : 'core.background.light',
            width: '100%',
            height: '100%',
            pt: smallScreen ? '16px' : '32px',
          };
        },
      },
    },

    colors: {
      core: {
        background: {
          light: '#EEEEEE',
          dark: '#1E1E1E',
        },

        backgroundAccent: {
          light: '#DDDDDD',
          dark: '#2F2F2F',
        },

        backgroundHighlight: {
          light: '#F2F2F2',
          dark: '#262626',
        },

        text: {
          light: '#0D0D0D',
          dark: '#FFFFFF',
        },

        textMuted: {
          light: '#AAAAAA',
          dark: '#AAAAAA',
        },

        pressable: {
          background: {
            light: '#FFFFFF',
            dark: '#333333',
          },

          pressedBackground: {
            light: '#e6e6e6',
            dark: '#1a1a1a',
          },
        },
      },

      apple: {
        red: {
          light: 'rgb(255, 59, 48)',
          dark: 'rgb(255, 69, 58)',
        },

        orange: {
          light: 'rgb(255, 149, 0)',
          dark: 'rgb(255, 159, 10)',
        },

        yellow: {
          light: 'rgb(255, 204, 0)',
          dark: 'rgb(255, 214, 10)',
        },

        green: {
          light: 'rgb(52, 199, 89)',
          dark: 'rgb(48, 209, 88)',
        },

        mint: {
          light: 'rgb(0, 199, 190)',
          dark: 'rgb(102, 212, 207)',
        },

        teal: {
          light: 'rgb(48, 176, 199)',
          dark: 'rgb(64, 200, 224)',
        },

        blue: {
          light: 'rgb(0, 122, 255)',
          dark: 'rgb(10, 132, 255)',
        },

        cyan: {
          light: 'rgb(50, 173, 230)',
          dark: 'rgb(100, 210, 255)',
        },

        indigo: {
          light: 'rgb(88, 86, 214)',
          dark: 'rgb(94, 92, 230)',
        },

        purple: {
          light: 'rgb(175, 82, 222)',
          dark: 'rgb(191, 90, 242)',
        },

        pink: {
          light: 'rgb(255, 45, 85)',
          dark: 'rgb(255, 55, 95)',
        },

        brown: {
          light: 'rgb(162, 132, 94)',
          dark: 'rgb(172, 142, 104)',
        },

        gray: {
          50: 'rgb(242, 242, 247)',
          100: 'rgb(229, 229, 234)',
          200: 'rgb(209, 209, 214)',
          300: 'rgb(199, 199, 204)',
          400: 'rgb(174, 174, 178)',
          500: 'rgb(142, 142, 147)',
          600: 'rgb(99, 99, 102)',
          700: 'rgb(72, 72, 74)',
          800: 'rgb(44, 44, 46)',
          900: 'rgb(28, 28, 30)',
        },
      },
    },
  });
}
