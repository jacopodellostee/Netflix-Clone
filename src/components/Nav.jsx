import { NavLink } from 'react-router-dom'

import routes from '../routes/routes'

export default function Nav() {
    return (
        <nav className={`flex items-center gap-3`} >
            {routes[0].children.map((el, index) =>
                el.showInNav && (
                    <NavLink key={el.path ?? index} to={el.path ?? '/'}>
                        {el.title}
                    </NavLink>
                )
            )}
        </nav>
    )
}