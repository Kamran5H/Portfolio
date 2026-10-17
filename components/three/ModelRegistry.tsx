'use client';

import React from 'react';
import PhoneModel from './models/PhoneModel';
import PapersModel from './models/PapersModel';
import EnvelopeModel from './models/EnvelopeModel';
import DiskModel from './models/DiskModel';
import MorphModel from './models/MorphModel';
import BookModel from './models/BookModel';
import FunnelModel from './models/FunnelModel';
import PrismModel from './models/PrismModel';
import AtomModel from './models/AtomModel';

interface ModelRegistryProps {
  model?: string;
}

export default function ModelRegistry({ model }: ModelRegistryProps) {
  switch (model) {
    case 'phone':
      return <PhoneModel />;
    case 'papers':
      return <PapersModel />;
    case 'envelope':
      return <EnvelopeModel />;
    case 'disk':
      return <DiskModel />;
    case 'morph':
      return <MorphModel />;
    case 'book':
      return <BookModel />;
    case 'funnel':
      return <FunnelModel />;
    case 'prism':
      return <PrismModel />;
    case 'atom':
      return <AtomModel />;
    default:
      return <AtomModel />;
  }
}
