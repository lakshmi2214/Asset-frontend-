
export function getAssetGroup(asset) {
  if (!asset) return 'other';
  const name = (asset.name || '').toLowerCase().trim();
  const sub = (asset.subcategory?.name || '').toLowerCase().trim();
  const cat = (asset.category?.name || '').toLowerCase().trim();

  if (
    name.includes('battery') ||
    name.includes('charger') ||
    name.includes('power bank') ||
    name.includes('v-mount') ||
    name.includes('adapter')
  ) {
    return 'power';
  }

  if (
    name.includes('mic') ||
    name.includes('audio') ||
    name.includes('sound') ||
    name.includes('speaker') ||
    name.includes('mixer') ||
    name.includes('shure') ||
    name.includes('at2040') ||
    name.includes('podcast') ||
    sub.includes('mic') ||
    sub.includes('audio') ||
    cat.includes('audio')
  ) {
    return 'audio';
  }


  if (
    name.includes('card') ||
    name.includes('lexar') ||
    name.includes('storage') ||
    name.includes('media') ||
    name.includes('cf express') ||
    name.includes('sd') ||
    sub.includes('card') ||
    sub.includes('lexar') ||
    cat.includes('storage') ||
    cat.includes('media')
  ) {
    return 'storage';
  }

  if (
    name.includes('lens') ||
    name.includes('50mm') ||
    name.includes('28 50') ||
    name.includes('gmaster') ||
    name.includes('prime') ||
    name.includes('zoom')
  ) {
    return 'lens';
  }

  // 5. Cameras
  if (
    name.includes('camera') ||
    name.includes('fx3') ||
    name.includes('canon') ||
    name.includes('sony a') ||
    name.includes('dslr') ||
    name.includes('cinema') ||
    sub.includes('camera') ||
    sub.includes('fx3')
  ) {
    return 'camera';
  }

  // 6. Lighting
  if (
    name.includes('light') ||
    name.includes('aputure') ||
    name.includes('softbox') ||
    name.includes('led') ||
    name.includes('godox') ||
    cat.includes('light') ||
    sub.includes('light') ||
    sub.includes('softbox')
  ) {
    return 'lighting';
  }

  // 7. Tripods & Rigging / Stands & Support
  if (
    name.includes('tripod') ||
    name.includes('monopod') ||
    name.includes('gimbal') ||
    name.includes('stabilizer') ||
    name.includes('stand') ||
    name.includes('boom') ||
    name.includes('c-stand') ||
    name.includes('holder') ||
    cat.includes('stand') ||
    cat.includes('support') ||
    sub.includes('stand')
  ) {
    return 'tripod';
  }

  // 8. Backdrops & Studio Rigging
  if (
    name.includes('backdrop') ||
    name.includes('screen') ||
    name.includes('green screen') ||
    cat.includes('backdrop') ||
    sub.includes('screen')
  ) {
    return 'backdrop';
  }

  // Fallbacks by subcategory
  if (sub.includes('battery') || sub.includes('charger')) return 'power';
  if (sub.includes('lens')) return 'lens';
  if (sub.includes('camera')) return 'camera';

  return 'other';
}

export function getGroupDisplayName(group) {
  switch (group) {
    case 'camera':
      return 'Cameras & Cinema Gear';
    case 'audio':
      return 'Microphones & Audio Equipment';
    case 'power':
      return 'Batteries & Power Accessories';
    case 'lens':
      return 'Lenses & Optics';
    case 'storage':
      return 'Memory Cards & Storage Media';
    case 'lighting':
      return 'Lighting & Studio Setup';
    case 'tripod':
      return 'Tripods & Supports';
    case 'backdrop':
      return 'Backdrops & Studio Rigging';
    default:
      return 'Related Equipment';
  }
}

/**
 * Filter assets to only those in the same equipment group as targetAsset,
 * with the targetAsset sorted to the top.
 */
export function getRelatedAssets(targetAsset, allAssets) {
  if (!targetAsset || !Array.isArray(allAssets)) return allAssets || [];

  const targetGroup = getAssetGroup(targetAsset);

  // Filter items in the exact same equipment group
  const sameGroup = allAssets.filter((a) => {
    if (String(a.id) === String(targetAsset.id)) return true;
    return getAssetGroup(a) === targetGroup;
  });

  // Sort target asset to the very top (index 0), then others
  return sameGroup.sort((a, b) => {
    if (String(a.id) === String(targetAsset.id)) return -1;
    if (String(b.id) === String(targetAsset.id)) return 1;
    return 0;
  });
}

