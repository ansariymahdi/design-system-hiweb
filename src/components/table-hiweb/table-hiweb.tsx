import { Component, h } from '@stencil/core';

@Component({
  tag: 'table-hiweb',
  styleUrl: 'table-hiweb.scss',
  shadow: true,
})
export class TableHiweb {
  render() {
    return (
      <div class="table-responsive">
        <table class="table text-right">
          <thead>
            <tr>
              <th>ردیف</th>
              <th>موضوع</th>
              <th>موضوع</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>ردیف</th>
              <th>موضوع</th>
              <th>موضوع</th>

              <th></th>
            </tr>
            {/* {
                                            optionGroups.length !== 0 ?

                                                optionGroups.map((item, index) => (
                                                    <tr>
                                                        <th >{index + 1}</th>
                                                        <td>{item?.groupName}</td>
                                                        <td>{item?.options[0]?.title}</td>
                                                        <td>{item?.options[1]?.title}</td>

                                                        <td>
                                                            <ul className=" mr-auto list-inline">
                                                                <li class="list-inline-item"><a><i className="feather icon-edit-2" /></a></li>
                                                                <li class="list-inline-item"><a><i className="feather icon-trash-2" /></a></li>
                                                            </ul>

                                                        </td>
                                                    </tr>

                                                ))

                                                : <div></div>



                                        } */}
          </tbody>
        </table>
      </div>
    );
  }
}
