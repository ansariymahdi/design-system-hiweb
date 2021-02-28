import { Component, h, EventEmitter, Prop, State, Event } from '@stencil/core';
import ArrowUp from './../../assets/icons/ArrowUp.svg';

@Component({
  tag: 'card-accordion-hiweb',
  styleUrl: 'card-accordion-hiweb.scss',
  shadow: true,
})
export class CardAccordionHiweb {
  @Prop() label: string;

  @State() toggle: boolean = false;

  @Event() onToggle: EventEmitter;
  toggleComponent() {
    this.toggle = !this.toggle;
    this.onToggle.emit({ visible: this.toggle });
  }
  render() {
    return (
      <div class="row direction-rtl">
        <div class="col">
          <div class={`sidebar-nav-menu-item card ${this.toggle ? 'item-active' : ''}`}>
            <div class="card-header" onClick={() => this.toggleComponent()}>
              <h5 class="card-title"> {this.label}</h5>
              <div class="placeholder fa-chevron-down" innerHTML={ArrowUp} />
            </div>
            <div class={'sidebar-nav-menu-item-body'}>
              <div class="row">
                <div class="card-body">
                  <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                    است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت
                    فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در
                    این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی
                    سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div class="row direction-rtl">
      //   <div class="col">
      //     <div class={`sidebar-nav-menu-item card ${this.toggle ? 'item-active' : ''}`}>
      //       <div class="card-header">
      //         <h5 class="card-title" onClick={() => this.toggleComponent()}>
      //           {' '}
      //           {this.label}
      //         </h5>
      //         {/* <div class="placeholder fa-chevron-down" innerHTML={ArrowUp} /> */}
      //         {/* <!-- <ArrowUp width={20} height={20} class="fa-chevron-down" /> --> */}
      //       </div>
      //       <div>
      //         <div class="row">
      //           <div class="card-body">
      //             <div class="table-responsive">

      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
