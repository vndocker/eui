import React from 'react';

import { EuiBreadcrumbs } from '../../../../src/components';

export default () => {
  const breadcrumbs = [
    {
      text: 'Animals',
      href: '#',
    },
    {
      text: 'Metazoans',
      href: '#',
    },
    {
      text: 'Chordates',
      href: '#',
    },
    {
      text: 'Vertebrates',
      href: '#',
    },
    {
      text: 'Tetrapods',
      href: '#',
    },
    {
      text: 'Reptiles',
      href: '#',
    },
    {
      text: 'Boa constrictor',
      href: '#',
    },
    {
      text: 'Nebulosa subspecies',
    },
  ];

  return (
    <EuiBreadcrumbs
      max={4}
      breadcrumbs={breadcrumbs}
      aria-label="An example of EuiBreadcrumbs with specifying max prop"
    />
  );
};
