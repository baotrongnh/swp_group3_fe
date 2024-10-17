import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { useQuery } from "@tanstack/react-query"
import { Input } from "antd"
import { useState } from "react"
import { loadAllSkills } from "../../../../apis/mentor"
import CheckboxSkill from "../CheckboxSkill/CheckboxSkill"
import './SkillSearch.scss'

function SkillSearch() {
     const { data: listSkills } = useQuery({ queryKey: ['listSkill'], queryFn: loadAllSkills })
     const [numberSkills, setNumberSkills] = useState(5)
     const [searchSkillValue, setSearchSkillValue] = useState('')
     const [isShowMore, setIsShowMore] = useState(false)

     const listSkillsSearch = listSkills?.filter(skill => searchSkillValue === '' || skill.name.toLowerCase().includes(searchSkillValue.toLowerCase()))

     const handleChangeSearch = (e) => {
          setSearchSkillValue(e.target.value)
     }

     const handleShowMore = () => {
          setNumberSkills(numberSkills === 5 ? listSkills.length : 5)
          setIsShowMore(!isShowMore)
     }

     return (
          <div className="skill-search">
               <h1 className='title-skill'>Skills</h1>
               <Input
                    onChange={handleChangeSearch}
                    className='input-search'
                    placeholder="Search for skills"
                    size='large'
                    style={{ fontSize: 16 }}
               />
               <p className='sub-text-found'>100+ mentors found</p>
               <div className="skill-block">
                    {listSkillsSearch?.slice(0, numberSkills).map((skill) => (
                         <CheckboxSkill key={skill.id} id={skill.id} skillName={skill.name} numberMentor={99} />
                    ))}
                    <p onClick={handleShowMore} className='show-more-text' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}>
                         {isShowMore
                              ? <>
                                   Show less
                                   <UpOutlined />
                              </>
                              : <>
                                   Show more
                                   <DownOutlined />
                              </>
                         }
                    </p>
               </div>
          </div>
     )
}

export default SkillSearch