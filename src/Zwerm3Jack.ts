/**
 * Some constants we need to remember and pass to our library,
 * this can be changed when we init the lib
 */
class Zwerm3Jack {
  /**
   * This is the folder path where jackd, jack_connect, jack_disconnect and jack_lsp is running
   */
  public static jackFolderPath = '';

  /**
   * This the path of the jacktrip binary
   */
  public static jacktripBinPath = '';

  /**
   * Give a boolean if we have set a custom jack folder path
   */
  public static get hasCustomJackFolderPath(): boolean {
    return Zwerm3Jack.jackFolderPath !== '';
  }

  /**
   * Give a boolean if we have set a custom jacktrip binary path
   */
  public static get hasCustomJacktripBinPath(): boolean {
    return Zwerm3Jack.jacktripBinPath !== '';
  }
}

export default Zwerm3Jack;
