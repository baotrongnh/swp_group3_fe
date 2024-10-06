import { useContext } from 'react';
import './MentorListPage.scss';
import { Col, DatePicker, Input, Pagination, Row } from 'antd';
import { AppContext } from '../../Contexts/AppContext';
import { CheckboxSkill, MentorCard, RatingSelect } from './Components';
import { DownOutlined } from '@ant-design/icons';
import { searchMentor } from '../../apis/mentor';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../../Components';

function MentorListPage() {
     const { filterMentor, setFilterMentor } = useContext(AppContext);
     const { data, isLoading } = useQuery({ queryKey: ['listMentor', filterMentor], queryFn: () => searchMentor(filterMentor), keepPreviousData: true });

     console.log(data);

     const handleChangePage = (page) => {
          setFilterMentor({ ...filterMentor, page });
     }

     const onChangeTime = (date, dateString) => {
          console.log(dateString);
     }

     return (
          <div className="mentor-list-page">
               {isLoading && <Loading />}

               <div className="container">
                    <Row>
                         <Col xs={0} md={7} lg={5} className='left-sidebar'>
                              <div className='skill-search-block'>
                                   <h1 className='title-skill'>Skills</h1>
                                   <Input className='input-search' placeholder="Search for skills" size='large' style={{ fontSize: 16 }} />
                                   <p className='sub-text-found'>100+ mentors found</p>

                                   <div className="skill-block">
                                        <CheckboxSkill id='1' skillName='ReactJS' numberMentor={23} />
                                        <CheckboxSkill id='2' skillName='NodeJS' numberMentor={8} />
                                        <CheckboxSkill id='3' skillName='Java' numberMentor={1} />
                                        <CheckboxSkill id='4' skillName='.NET' numberMentor={3} />
                                        <CheckboxSkill id='5' skillName='HTML/CSS' numberMentor={99} />
                                        <p className='show-more-text'>Show more <DownOutlined /></p>
                                   </div>
                              </div>

                              <div className="rating-filter-block">
                                   <RatingSelect />
                              </div>

                              <div className='date-filter-block'>
                                   <h1 className="title-filter-date" style={{ margin: '20px 0', fontSize: '2.2rem', fontWeight: '500' }}>Date</h1>
                                   <DatePicker
                                        multiple
                                        onChange={onChangeTime}
                                        maxTagCount="responsive"
                                        size="large"
                                        format='DD-MM-YYYY'
                                   />
                              </div>
                         </Col>

                         <Col xs={24} md={17} lg={19} className='mentor-block'>
                              <Row gutter={15}>
                                   {data?.mentors.map((mentor) => (
                                        <Col xs={24} xl={12} key={mentor.id}>
                                             <MentorCard
                                                  id={mentor.id}
                                                  avatar={mentor.imgPat || 'https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg'}
                                                  name={mentor.fullName}
                                                  semester={7}
                                                  ratingCount={mentor.ratingCount}
                                                  rating={mentor.averageRating}
                                                  description='Hello, I am passionate Frontend Engineer at Coinbase with a deep love for mentoring engineers and guiding them through their'
                                                  skills={['ReactJS', 'NodeJS', 'HTML/CSS', 'PHP', 'Python']}
                                             />
                                        </Col>
                                   ))}
                              </Row>
                              <Pagination
                                   className='pagination'
                                   onChange={(page) => handleChangePage(page)}
                                   align="center"
                                   defaultPageSize={10}
                                   defaultCurrent={1}
                                   total={data?.totalMentors}
                                   showSizeChanger={false}
                                   hideOnSinglePage={true}
                              />
                         </Col>
                    </Row>
               </div>
          </div>
     );
}

export default MentorListPage;