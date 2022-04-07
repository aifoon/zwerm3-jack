/**
 * A Module to help us with CLI Params
 */

interface CLIParam {
  flag: string;
  value?: string;
}

export class CLIParams {
  private cliParams;

  constructor() {
    this.cliParams = new Set<CLIParam>();
  }

  addParam(cliParam: CLIParam) {
    this.cliParams.add(cliParam);
  }

  toArray(): CLIParam[] {
    return Array.from(this.cliParams);
  }

  toStringArray(): string[] {
    const cliParams = this.toArray();
    const out: string[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const cliParam of cliParams) {
      out.push(cliParam.flag);
      if (cliParam.value) out.push(cliParam.value);
    }
    return out;
  }

  toString(): string {
    return this.toArray().reduce(
      // eslint-disable-next-line no-return-assign
      (acc, currentValue) =>
        // eslint-disable-next-line no-param-reassign
        (acc = `${acc}${currentValue.flag} ${
          currentValue.value ? `${currentValue.value} ` : ''
        }`),
      ''
    );
  }
}
