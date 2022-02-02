import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

const NavigationDrawer = () => {
  let navigate = useNavigate();
  
    return(
        <AppBar style={{marginBottom:'2%', position:'relative'}}>
          <Container>
            <Toolbar disableGutters>
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            onClick={() => navigate('/')}
          >
            Home
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            onClick={() => navigate('/Liquidity')}
          >
            Liquidity
          </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    );
}

export default NavigationDrawer;