
export default  {
    palette: {
        primary: {
          light: "#33c9dc",
          main: "#00bcd4",
          dark: "#008394",
          contrastText: "#fff"
        },
        secondary: {
          light: "#ff6333",
          main: "#ff3d00",
          dark: "#b22a00",
          contrastText: "#fff"
        },
        customWhite: {
          light: "#fff",
          main: "#fff",
          dark: "#fff",
          contrastText: "#fff"
        }
      },
      typography: {
        useNextVariants: true
      },
      common: {
        card: {
            maxWidth: 345,
            margin: "auto",
            textAlign: "center"
          },
          button: {
            margin: "20px auto 20px auto",
            float: "right"
          },
          title: {
            textAlign: "center",
            fontSize: 45,
            color: "#00bcd4"
          },
          caption: {
            color: "red",
            margin: 20
          },
          btnLink: {
              margin: "30px auto 10px 0",
              float: "left"
          },
          closeButton: {
              position: 'absolute',
              top: '1%',
              left: '91%'
          },
          invisibleSeparator: {
            border: 'none',
            margin: '0 0 10px 0'
        },
        visibleSeparator: {
          width: '100%',
          borderBottom: '1px solid rgba(0 0 0 0.1)'
      }
      }
      
}