import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

export const adminTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#017D73"
        },
        secondary: {
            main: "#38a5f8"
        },
        error: red,
        contrastThreshold: 1,
        tonalOffset: 0.2
    }
});
