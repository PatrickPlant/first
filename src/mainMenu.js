module.exports = [
    {
        label: 'Menu',
        submenu: [
            { 
                label: 'Adjust value'
            },
            { 
                label: 'CoinMarketCap',
                click() {
                    shell.openExternal('http://coinmarketcap.com');
                }
            },
            { type: 'separator'},
            { 
                label: 'Exit',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
      label: 'Debug',
      submenu: [
          { 
              label: 'Toggle Developer Tools',
              role: 'toggledevtools'
          }
      ]
    }
]