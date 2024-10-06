import { Row, Col, Input, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Header.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import useDebounce from '../../hooks/useDebounce';

function Header() {
     const { setFilterMentor, filterMentor } = useContext(AppContext);
     const [searchValue, setSearchValue] = useState(null);
     const location = useLocation();
     const navigate = useNavigate();
     const debounceSearchValue = useDebounce(searchValue, 800);

     const onSearch = (value) => {
          const url = '/mentorlist'
          if (location.pathname !== url) {
               navigate(url);
          }
          setFilterMentor({ ...filterMentor, search: value });
     }

     const handleChange = (e) => {
          setSearchValue(e.target.value);
     }

     useEffect(() => {
          if (debounceSearchValue !== null) {
               setFilterMentor({ ...filterMentor, search: debounceSearchValue });
          }
     }, [debounceSearchValue]);

     const items = [
          {
               label: (
                    <Link>
                         Add member
                    </Link>
               ),
               key: '0',
          },
          {
               label: (
                    <Link >
                         History
                    </Link>
               ),
               key: '1',
          },
          {
               type: 'divider',
          },
          {
               label: '3rd menu item（disabled）',
               key: '3',
               disabled: true,
          },
     ];

     const accountSubMenu = [
          {
               label: (
                    <Link to="/profile">
                         Profile
                    </Link>
               ),
               key: '0',
          },
          {
               label: (
                    <Link to="/settings">
                         Point wallet
                    </Link>
               ),
               key: '1',
          },
          {
               type: 'divider',
          },
          {
               label: (
                    <Link style={{ color: 'red' }}>Logout</Link>
               ),
               key: '3',
          },
     ];

     return (
          <div className="header">
               <div className="container">
                    <Row className='header-block'>
                         <Col className='logo-block' md={6}>
                              <h1>SWP Mentor Booking Logo</h1>
                         </Col>

                         <Col className='search-block' md={9}>
                              <Input.Search
                                   placeholder="Find mentors"
                                   onSearch={onSearch}
                                   style={{
                                        width: '100%',
                                   }}
                                   size='large'
                                   allowClear
                                   onClear={() => setFilterMentor({ ...filterMentor, search: '' })}
                                   onChange={e => handleChange(e)}
                              />
                         </Col>

                         <Col md={9} className='btn-block'>
                              <Link className='navbar-link'>Schedule</Link>
                              <Link className='navbar-link'>Deposit</Link>
                              <Dropdown
                                   menu={{
                                        items,
                                   }}
                                   placement='bottom'
                              >
                                   <Link className='navbar-link' onClick={(e) => e.preventDefault()}>
                                        <Space>
                                             More
                                             <DownOutlined />
                                        </Space>
                                   </Link>
                              </Dropdown>

                              <Dropdown
                                   menu={{
                                        items: accountSubMenu
                                   }}
                                   placement='bottomRight'
                              >
                                   <Link to='/profile' className='navbar-link account'>
                                        <Icon className='icon' icon="material-symbols-light:account-circle" />
                                   </Link>
                              </Dropdown>
                         </Col>
                    </Row>
               </div>
          </div>
     )
}

export default Header