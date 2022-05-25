export default function checkBank(value) {
  // VISA
  if (value.startsWith(4)) {
    return 'visa';
  }

  // MasterCard
  if (value.match(/^5[1-5]/) || (value.substring(0, 4) >= 2221 && value.substring(0, 4) <= 2720)) {
    return 'master';
  }

  // // МИР
  if (value.match(/^220[0-4]/)) {
    return 'mir';
  }

  // American Express
  if (value.match(/^3[47]/)) {
    return 'amex';
  }

  // Discover
  if (value.startsWith(6011)) {
    return 'discover';
  }

  // JCB
  if (value.startsWith(2131) || value.startsWith(1800) || value.startsWith(35)) {
    return 'jcb';
  }

  // Diners Club
  if (value.match(/^30[0-5]/) || value.startsWith(36) || value.startsWith(38)) {
    return 'diners_club';
  }

  return false;
}
