import { DownOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Button, Col, Drawer, Dropdown, Flex, Row, Select, Switch } from 'antd'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import defaultAvatar from '../../assets/Photos/avatar/default_avatar.jpg'
import logo from '../../assets/Photos/logo/logo.png'
import { AppContext } from '../../Contexts/AppContext'
import { AuthContext } from '../../Contexts/AuthContext'
import { deleteToken } from '../../utils/storageUtils'
import { ModalBecomeMentor } from '../Modal'
import './HeaderMentor.scss'

function HeaderMentor() {
     const { t, i18n } = useTranslation()
     const { setTheme, theme } = useContext(AppContext)
     const { currentUser, setCurrentUser } = useContext(AuthContext)
     const [openModalBeMentor, setOpenModalBeMentor] = useState(false)
     const [openDrawer, setOpenDrawer] = useState(false)
     const [openDropDownAccount, setOpenDropDownAccount] = useState(false)

     const handleMenuAccountClick = (e) => {
          if (e.key !== '4' && e.key !== '5') {
               setOpenDropDownAccount(false)
          }
     }

     const handleOpenAccountChange = (nextOpen, info) => {
          if (info.source === 'trigger' || nextOpen) {
               setOpenDropDownAccount(nextOpen)
          }
     }

     const handleLogout = () => {
          setCurrentUser(undefined)
          deleteToken()
          sessionStorage.removeItem('currentUser')
     }

     const handleChangeTheme = (status) => {
          if (status) {
               setTheme('dark-theme')
               localStorage.setItem('theme', 'dark-theme')
          } else {
               setTheme('light-theme')
               localStorage.setItem('theme', 'light-theme')
          }
     }

     const handleChangeLanguage = (value) => {
          i18n.changeLanguage(value)
     }

     const moreMenuDropDown = [
          {
               label: <Link>Add member</Link>,
               key: '0',
          },
          {
               label: <Link >History</Link>,
               key: '1',
          }
     ]

     const accountMenuDropDown = [
          { type: 'divider' },
          {
               label: <Link to="/student/profile">{t('profile')}</Link>,
               key: '0',
          },
          {
               label: <Link to='/wallet'><Flex gap='small' align='center'>{t('wallet')}: <Icon icon="twemoji:coin" /><p> 99</p></Flex></Link>,
               key: '1',
          },
          { type: 'divider' },
          {
               label: <Flex gap='small' justify='space-between'>
                    {t('theme')}: <Switch
                         defaultChecked={theme === 'dark-theme'}
                         onChange={handleChangeTheme}
                         checkedChildren="Dark"
                         unCheckedChildren="Light"
                    />
               </Flex>,
               key: '4'
          },
          {
               label: <Flex gap='small' align='center' justify='space-between'>
                    {t('language')}: <Select
                         defaultValue="en"
                         onChange={handleChangeLanguage}
                         options={[
                              {
                                   value: 'en',
                                   label: 'EN',
                              },
                              {
                                   value: 'vi',
                                   label: 'VN',
                              }
                         ]}
                    />
               </Flex>,
               key: '5'
          },
          { type: 'divider' },
          {
               label: <Link onClick={handleLogout}>{t('logout')}</Link>,
               key: '3',
               danger: true
          },
     ]

     return (
          <div className="header-mentor">
               <div className="container">
                    <Row className='header-block'>
                         <Col className='logo-block' xs={12} sm={12} md={12} lg={12}>
                              <Link to='/'>
                                   <img className='logo-img' src={logo} alt="" />
                              </Link>
                         </Col>

                         <Col xs={12} sm={0} className='btn-navbar-mobile'>
                              <Button onClick={() => setOpenDrawer(true)} type='text'>
                                   <Icon className='icon' icon="ic:round-menu" />
                              </Button>
                         </Col>

                         <Col xs={0} sm={3} md={3} lg={0} className='btn-navbar-mobile'>
                              <Button onClick={() => setOpenDrawer(true)} type='text'>
                                   <Icon className='icon' icon="ic:round-menu" />
                              </Button>
                         </Col>

                         <Col xs={0} md={0} lg={12}>
                              <div className='btn-block'>
                                   <NavLink to='/pending-booking' className='navbar-link'>{t('pending booking')}</NavLink>
                                   <NavLink to={`/schedule/${currentUser?.id}`} className='navbar-link'>{t('schedule')}</NavLink>
                                   <Dropdown
                                        menu={{ items: moreMenuDropDown }}
                                        placement='bottom'
                                        trigger={['click']}
                                   >
                                        <Link className='navbar-link' onClick={(e) => e.preventDefault()}>
                                             {t('more')} <DownOutlined />
                                        </Link>
                                   </Dropdown>

                                   <div >
                                        <Flex align='center'>
                                             <Link to='/student/profile' className='navbar-link account'>
                                                  {currentUser?.imgPath
                                                       ? <img className='avatar' src={currentUser?.imgPath} alt="" onError={(e) => e.target.src = defaultAvatar} />
                                                       : <Icon className='icon' icon="material-symbols-light:account-circle" />
                                                  }
                                             </Link>
                                             <Dropdown
                                                  menu={{ items: accountMenuDropDown, onClick: handleMenuAccountClick }}
                                                  placement='bottomRight'
                                                  trigger={['click']}
                                                  arrow={true}
                                                  onOpenChange={handleOpenAccountChange}
                                                  open={openDropDownAccount}
                                             >
                                                  <div>
                                                       <Icon style={{ cursor: 'pointer' }} icon="icon-park-outline:down" />
                                                  </div>
                                             </Dropdown>
                                        </Flex>
                                   </div>
                              </div>
                         </Col>
                    </Row>
               </div>

               <Drawer
                    className='navbar-drawer'
                    placement='right'
                    width={350}
                    title="Basic Drawer"
                    onClose={() => setOpenDrawer(false)}
                    open={openDrawer}
               >
                    <div className="navbar-mobile-block">
                         <Link
                              onClick={() => setOpenDrawer(false)}
                              to='/browser-mentors'
                              className='link-item'
                         >
                              Browser mentors
                         </Link>

                         <Link
                              onClick={() => setOpenDrawer(false)}
                              to={`/schedule/${currentUser?.id}`}
                              className='link-item'
                         >
                              Schedule
                         </Link>

                         <Link
                              onClick={() => setOpenDrawer(false)}
                              to='/wallet'
                              className='link-item'
                         >
                              Wallet
                         </Link>

                         <Link
                              onClick={() => {
                                   setOpenDrawer(false)
                                   setOpenModalBeMentor(true)
                              }}
                              className='link-item'
                         >
                              Become a mentor
                         </Link>

                         <Link
                              onClick={() => setOpenDrawer(false)}
                              to='/student/profile'
                              className='link-item'
                         >
                              Your profile
                         </Link>
                    </div>
               </Drawer>

               <ModalBecomeMentor modalOpen={openModalBeMentor} setModalOpen={setOpenModalBeMentor} />
          </div>
     )
}

export default HeaderMentor