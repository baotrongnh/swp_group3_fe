import PropTypes from 'prop-types'
import { createContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
     const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light-theme')
     const [filterMentor, setFilterMentor] = useState({ search: '', skills: [], star: '', page: 1 })
     const [mentorList, setMentorList] = useState([])
     const { t, i18n } = useTranslation()

     return <AppContext.Provider
          value={{
               theme,
               setTheme,
               filterMentor,
               setFilterMentor,
               mentorList,
               setMentorList,
               t,
               i18n
          }}
     >
          {children}
     </AppContext.Provider>
}

AppProvider.propTypes = {
     children: PropTypes.node
}