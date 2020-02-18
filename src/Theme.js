import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

export const adminTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#311b92"
        },
        secondary: {
            main: "#b71c1c"
        },
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2
    }
});
