import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const styles = ({ direction, spacing, transitions, breakpoints, palette, shape }) => ({
  header: {
    fontWeight: 900,
    minWidth: 0,
    fontSize: 18,
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    marginRight: 8,
    borderRadius: shape.borderRadius,
    background: palette.type === 'dark' ? palette.background.default : palette.grey[200],
    '&:hover': {
      background: palette.type === 'dark' ? palette.background.paper : palette.grey[300],
    },
    marginLeft: 0,
    width: '100%',
    [breakpoints.up('sm')]: {
      marginLeft: spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    borderRadius: 4,
    paddingTop: spacing(1),
    paddingRight: spacing(direction === 'rtl' ? 10 : 1),
    paddingBottom: spacing(1),
    paddingLeft: spacing(direction === 'rtl' ? 1 : 10),
    transition: transitions.create('width'),
    width: '100%',
    [breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});
const NavLink = styled.a`
  text-decoration: none;
`;

const MenuBar = ({ classes }) => (
  <>
    <img src='https://i.imgur.com/gDGrd2Y.png' alt='Logo icon' style={{ width: '30px', height: '30px' }} />
    <div className={classes.grow} />
    <Grid container justify={'flex-end'} spacing={2} alignItems='flex-start'>
      <Grid item>
        <Button color='primary'>
          <Link href='/'>
            <NavLink>Home</NavLink>
          </Link>
        </Button>
      </Grid>
    </Grid>
  </>
);

export default withStyles(styles)(MenuBar);
