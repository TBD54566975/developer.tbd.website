---
title: Title Lorem Ipsum
hide_table_of_contents: true
authors:
  name: Angie Jones
tags: [A Tag, B Tag]
stuff: stuff
---

import { Video } from '../src/components/Video';
import { TooltipWrapper } from '../src/components/TooltipWrapper';
import { Divider } from '@site/src/components/Divider'


<div className="prose prose-pink">

# {stuff}

<Video url = 'https://vimeo.com/702200087'
description = 'A panel discussion on Decentralized Identity (DID) where we talk use cases, benefits, DIDs vs NFTs, and what should and shouldnt go on a blockchain.'
details='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer est magna, elementum elementum vestibulum quis, finibus sed purus. Nulla gravida eleifend velit id efficitur. Fusce ligula odio, varius eu gravida sit amet, hendrerit et odio. Quisque quis maximus purus. Nunc ut libero ac erat finibus tincidunt. Suspendisse egestas, justo vitae bibendum dapibus, purus nibh efficitur turpis, sit amet mollis justo sapien id ligula. Maecenas in fermentum orci. Vestibulum sed urna vitae erat tempor elementum eu in nisl. Phasellus eu imperdiet turpis. Sed aliquet felis imperdiet ligula consequat sollicitudin. Suspendisse diam odio, sodales congue erat a, porta faucibus nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec neque turpis, placerat ut tellus nec, tristique sollicitudin neque. Donec maximus lobortis lorem, vitae vehicula enim rhoncus a. Curabitur interdum justo erat, vitae pretium turpis vehicula nec. Nulla dolor nisi, pretium vel ipsum sed, molestie mattis massa.'
summary= 'Transcripted Summary'></Video>
<Divider type="dotted" className="relative flex space-y-4" />

</div>

<!--truncate-->

<div className="prose prose-pink mt-18">

## Title Lorem Ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer est magna, elementum elementum vestibulum quis, finibus sed purus. Nulla gravida eleifend velit id efficitur. Fusce ligula odio, varius eu gravida sit amet, hendrerit et odio. Quisque quis maximus purus. Nunc ut libero ac erat finibus tincidunt. Suspendisse egestas, justo vitae bibendum dapibus, purus nibh efficitur turpis, sit amet mollis justo sapien id ligula. Maecenas in fermentum orci. Vestibulum sed urna vitae erat tempor elementum eu in nisl. Phasellus eu <TooltipWrapper trigger="imperdiet">This is the tool tip content</TooltipWrapper> turpis. Sed aliquet felis imperdiet ligula consequat sollicitudin. Suspendisse diam odio, sodales congue erat a, porta faucibus nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec neque turpis, placerat ut tellus nec, tristique sollicitudin neque. Donec maximus lobortis lorem, vitae vehicula enim rhoncus a. Curabitur interdum justo erat, vitae pretium turpis vehicula nec. Nulla dolor nisi, pretium vel ipsum sed, molestie mattis massa.

</div>
