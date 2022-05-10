import { HonorableTheme } from '../types'

import resolveBreakpoints from './resolveBreakpoints'
import resolveAliases from './resolveAliases'
import resolvePseudoSelectors from './resolvePseudoSelectors'
import resolveMp from './resolveMp'
import resolveWebkitProperties from './resolveWebkitProperties'
import resolveColor from './resolveColor'

function resolveAll(props: object, theme: HonorableTheme) {
  return resolveColor(resolveWebkitProperties(resolveMp(resolvePseudoSelectors(resolveAliases(resolveBreakpoints(props, theme), theme)))), theme)
}

export default resolveAll
