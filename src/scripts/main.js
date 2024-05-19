import dropdownToggle from '@js/modules/dropdown-toggle';
import toggleTabs from '@js/modules/toggle-tabs';
import setNavActiveState from '@js/modules/nav-active-state';
import getWalletData from '@js/modules/get-wallet-data';
import validateInput from '@js/modules/validate-input';

onload = () => {
  document.documentElement.style.scrollBehavior = "smooth";
};

dropdownToggle();
toggleTabs();
setNavActiveState();
getWalletData();
validateInput();