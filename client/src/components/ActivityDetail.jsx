import React from "react";

const ActivityDetail = () => {
  return (
    <div
      class="rounded my-bg-blue p-4 mt-3"
      style={{ marginRight: "20px", height: "" }}
    >
      <div class="row">
        {/* first column */}
        <div class="">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXNBxfBozL0lyKSrAWXsNNw-gyBUbp2Zmu5Q&usqp=CAU"
            alt="..."
            class=" rounded img-fluid pt-3"
          ></img>
        </div>

        {/* secound column */}
        <div class="">
          <form>
            <div class="form-group row">
              <label for="staticEmail" class="custom-label">
                Acctivity name1
              </label>
              <div class="col-sm-10 ">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext bg-white rounded "
                  id="staticEmail"
                  value="Running"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="custom-label">
                Acctivity name2
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext bg-white rounded"
                  id="staticEmail"
                  value="Running"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="custom-label">
                Acctivity name3
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext bg-white rounded"
                  id="staticEmail"
                  value="Running"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1" class="custom-label">
                Describe your journal
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ActivityDetail;
