export default function checkBank(value, func) {
  // VISA
  if (value.startsWith(4)) {
    func('.visa');
    return true;
  }

  // MasterCard
  if (value.match(/^5[1-5]/) || (value.substring(0, 4) >= 2221 && value.substring(0, 4) <= 2720)) {
    func('.master');
    return true;
  }

  // // МИР
  if (value.match(/^220[0-4]/)) {
    func('.mir');
    return true;
  }

  // American Express
  if (value.match(/^3[47]/)) {
    func('.amex');
    return true;
  }

  // Discover
  if (value.startsWith(6011)) {
    func('.discover');
    return true;
  }

  // JCB
  if (value.startsWith(2131) || value.startsWith(1800) || value.startsWith(35)) {
    func('.jcb');
    return true;
  }

  // Diners Club
  if (value.match(/^30[0-5]/) || value.startsWith(36) || value.startsWith(38)) {
    func('.diners_club');
    return true;
  }

  return false;
}
